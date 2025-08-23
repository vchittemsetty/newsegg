import { createClient } from '@supabase/supabase-js'
import Image from "next/image";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
)

export default function Home() {
  async function testSupabase() {
    let { data, error } = await supabase.from('test').select('*')
    console.log(data, error)
  }

  testSupabase()

  return <h1>Hello World from News Aggregator 🚀</h1>
}
