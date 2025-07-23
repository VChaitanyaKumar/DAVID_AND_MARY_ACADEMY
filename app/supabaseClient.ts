import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yqlvztofhlvkaylezfjx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxbHZ6dG9maGx2a2F5bGV6Zmp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNTM3MTEsImV4cCI6MjA2ODgyOTcxMX0.83oydnD0VUuLwnpQ0t2lVOUAvTrnRbL38JOOdAsaQtQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
