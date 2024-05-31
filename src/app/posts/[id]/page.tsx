import prisma from "@/lib/db"
import { notFound } from "next/navigation";

export default async function Page({params}: {
  params: {id: string}}) {
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(params.id)
    },
  })
  if (!post) {
    notFound();
  }
  const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
  return (
    <main className="px-7 pt-24 text-center">
      <h1 className="text-5xl font-semibold mb-7">{post.title}</h1>
      <p className="max-w-[700px] mx-auto ">{post.body}</p>
      <p className="max-w-[700px] text-white text-xs mx-auto">{post.createdAt.toLocaleDateString('en-GB', options)}</p>
    </main>
  )
}
