-- ══════════════════════════════════════════════════════
-- CONCRETE MEME TRANSFORMER — SQL SCHEMA
-- Run this in the Supabase SQL Editor
-- ══════════════════════════════════════════════════════

-- 1. MEMES TABLE
CREATE TABLE IF NOT EXISTS memes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  username text NOT NULL,
  title text,
  wallet_address text,
  overlay_id text NOT NULL,
  top_caption text NOT NULL,
  bottom_caption text NOT NULL,
  image_url text NOT NULL,
  vote_count integer DEFAULT 0,
  week_number integer NOT NULL DEFAULT EXTRACT(week FROM now())::integer
);

-- 2. VOTES TABLE
CREATE TABLE IF NOT EXISTS votes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  meme_id uuid REFERENCES memes(id) ON DELETE CASCADE,
  voter_fingerprint text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(meme_id, voter_fingerprint)
);

-- 3. STATS TABLE (for landing page counters)
CREATE TABLE IF NOT EXISTS stats (
  id integer PRIMARY KEY DEFAULT 1,
  total_memes integer DEFAULT 0,
  total_votes integer DEFAULT 0,
  total_bags integer DEFAULT 0
);

-- Initialize stats if empty
INSERT INTO stats (id) 
SELECT 1 WHERE NOT EXISTS (SELECT 1 FROM stats WHERE id = 1);

-- 4. INCREMENT VOTE FUNCTION
-- This handle atomic increments and duplicate prevention
CREATE OR REPLACE FUNCTION increment_vote(
  p_meme_id uuid,
  p_fingerprint text
) RETURNS json AS $$
DECLARE
  result json;
BEGIN
  -- Attempt to insert into votes table (unique constraint handles duplicates)
  INSERT INTO votes (meme_id, voter_fingerprint)
  VALUES (p_meme_id, p_fingerprint);
  
  -- If successful, increment meme count
  UPDATE memes 
  SET vote_count = vote_count + 1
  WHERE id = p_meme_id;

  -- Update global stats
  UPDATE stats
  SET total_votes = total_votes + 1
  WHERE id = 1;
  
  SELECT json_build_object('success', true) INTO result;
  RETURN result;
EXCEPTION WHEN unique_violation THEN
  SELECT json_build_object('success', false, 'error', 'already_voted') INTO result;
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. INCREMENT STATS MEMES FUNCTION
CREATE OR REPLACE FUNCTION increment_stats_memes() 
RETURNS void AS $$
BEGIN
  UPDATE stats SET total_memes = total_memes + 1 WHERE id = 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. RLS POLICIES (Row Level Security)
ALTER TABLE memes ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;

-- Memes policies
CREATE POLICY "Public read memes" ON memes FOR SELECT USING (true);
CREATE POLICY "Public insert memes" ON memes FOR INSERT WITH CHECK (true);

-- Votes policies
CREATE POLICY "Public read votes" ON votes FOR SELECT USING (true);
CREATE POLICY "Public insert votes" ON votes FOR INSERT WITH CHECK (true);

-- Stats policies
CREATE POLICY "Public read stats" ON stats FOR SELECT USING (true);
CREATE POLICY "Public update stats" ON stats FOR UPDATE USING (true);

-- 7. ENABLE REALTIME
-- Note: You also need to enable this in the Supabase Dashboard
-- Dashboard -> Database -> Replication -> supabase_realtime -> Tables -> Toggle 'memes' and 'stats'
ALTER PUBLICATION supabase_realtime ADD TABLE memes;
ALTER PUBLICATION supabase_realtime ADD TABLE stats;

-- 8. STORAGE SETUP INSTRUCTIONS
-- Create a new bucket called "meme-images"
-- Set it to "Public"
-- Add the following policy in Dashboard -> Storage -> Policies:
-- "Allow public upload" -> INSERT -> Target "meme-images" bucket
-- "Allow public read" -> SELECT -> Target "meme-images" bucket
