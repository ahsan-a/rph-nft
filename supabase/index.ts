import { createClient } from '@supabase/supabase-js';
import config from '#config';
const { SUPABASE_URL, SUPABASE_KEY } = config;

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
