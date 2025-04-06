import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "../../../../lib/config/db";
import { writeFile } from "fs/promises";
import mongoose from "mongoose";
import BlogModel from "../../../../lib/models/blogModel";
import { put } from '@vercel/blob';

const fs = require("fs")

// API Endpoint to get all blogs
export async function GET(req: NextRequest): Promise<NextResponse> {
  await ConnectDB();

  try {
    const blogId = req.nextUrl.searchParams.get("id");
    if (blogId) {
      const blog = await BlogModel.findById(blogId);
      if (!blog) {
        return NextResponse.json({ error: "Blog not found" }, { status: 404 });
      }
      return NextResponse.json({ blog }, { status: 200 });
    } else {
      const blogs = await BlogModel.find({});
      console.log("GET /api/blog - Fetching all blogs");
      return NextResponse.json({ blogs }, { status: 200 });
    }
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// API Endpoint for Uploading Blogs

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const image = formData.get("image") as File;

    // Vercel Blob में इमेज अपलोड करें
    const { url } = await put(image.name, image, {
      access: 'public',
    });

    // ब्लॉग डेटा सेव करें
    const BlogData = {
      // ...अन्य फील्ड
      image: url, // Vercel Blob URL
    };

    await BlogModel.create(BlogData);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("त्रुटि:", error);
    return NextResponse.json({ error: "सर्वर त्रुटि" }, { status: 500 });
  }
}


//creating api endpiont to delete the blog


export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ msg: "ID is required" }, { status: 400 });
    }

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ msg: "Invalid blog ID" }, { status: 400 });
    }

    // Find the blog by ID
    const blog = await BlogModel.findById(id);
    if (!blog) {
      return NextResponse.json({ msg: "Blog not found" }, { status: 404 });
    }

    // Delete the image associated with the blog
    try {
      const imagePath = `./public${blog.image}`;
      if (fs.existsSync(imagePath)) {
        await fs.promises.unlink(imagePath);
      }
    } catch (imgErr) {
      console.warn("Failed to delete image:", imgErr);
    }

    // Delete the blog from the database
    await BlogModel.findByIdAndDelete(id);

    return NextResponse.json({ msg: "Blog deleted successfully" }, { status: 200 });

  } catch (error) {
    console.error("DELETE handler error:", error);
    return NextResponse.json({ msg: "Something went wrong", error }, { status: 500 });
  }
}
