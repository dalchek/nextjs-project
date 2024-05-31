"use server"

import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(formData: FormData){
    // Auth check
    const { isAuthenticated } = getKindeServerSession()
    if (!(await isAuthenticated())) {
        redirect("/api/auth/login")
    }
    const title = formData.get("title") as string;
    const body = formData.get("body") as string;
   
    // insert into database
    await prisma.post.create({
        data: {
            title,
            body,
        },
    })

    // Revalidate for faster cashing due to saving and showing data in and from database
    revalidatePath("/posts")
}