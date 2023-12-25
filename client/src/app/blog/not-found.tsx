import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource. How you doin.</p>
      <p>
        View <Link href="/blog">all posts</Link>
      </p>
      <p>
        View <Link href="/profile">all profiles</Link>
      </p>
      <p>
        Drink Water!!!
      </p>
    </div>
  )
}