-- intern_progress: tracks user progress on predefined tasks
CREATE TABLE IF NOT EXISTS intern_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  project_id text NOT NULL,
  status text NOT NULL DEFAULT 'in_progress',
  last_activity_at timestamptz DEFAULT now(),
  last_review_at timestamptz,
  last_review_approved boolean,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, project_id)
);

ALTER TABLE intern_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own progress"
  ON intern_progress FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- personas: AI chat personas linked to custom simulations
CREATE TABLE IF NOT EXISTS personas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  simulation_id uuid NOT NULL REFERENCES simulations(id) ON DELETE CASCADE,
  name text NOT NULL,
  role text NOT NULL,
  personality text,
  system_prompt text,
  initial_message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE personas ENABLE ROW LEVEL SECURITY;

-- Users can read personas for their own simulations
CREATE POLICY "Users can read own simulation personas"
  ON personas FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM simulations s
      WHERE s.id = personas.simulation_id
      AND s.user_id = auth.uid()
    )
  );

-- Users can insert personas for their own simulations
CREATE POLICY "Users can insert own simulation personas"
  ON personas FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM simulations s
      WHERE s.id = personas.simulation_id
      AND s.user_id = auth.uid()
    )
  );
