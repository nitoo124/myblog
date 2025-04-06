import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "../../../../lib/config/db";
import { writeFile } from "fs/promises";
import mongoose from "mongoose";
import BlogModel from "../../../../lib/models/blogModel";
import axios from "axios";
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

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const formData = await req.formData();
    const image = formData.get("image") as File;

    if (!image) {
      return NextResponse.json({ error: "No image uploaded" }, { status: 400 });
    }

    await ConnectDB();

    // ✅ Upload image to Cloudinary
    const buffer = Buffer.from(await image.arrayBuffer());
    const base64 = buffer.toString("base64");
    const dataUrl = `data:${image.type};base64,${base64}`;

    const cloudRes = await axios.post(
      `https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload`,
      {
        file: dataUrl,
        upload_preset: "YOUR_UPLOAD_PRESET",
      }
    );

    const imgURL = cloudRes.data.secure_url;

    const requiredFields = ["title", "description", "category", "author", "authorImg"];
    for (const field of requiredFields) {
      if (!formData.get(field)) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 });
      }
    }

    const BlogData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      author: formData.get("author") as string,
      image: imgURL,
      authorImg: formData.get("authorImg") as string,
    };

    await BlogModel.create(BlogData);
    console.log("✅ Blog saved successfully");

    return NextResponse.json({ success: true, msg: "Blog added" }, { status: 201 });
  } catch (error) {
    console.error("❌ Error in POST request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
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
