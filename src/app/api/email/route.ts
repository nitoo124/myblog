import { NextRequest, NextResponse } from "next/server";
import emailModel from "../../../../lib/models/EmailModel";
import { ConnectDB } from "../../../../lib/config/db";

// Ensure database connection is established
const LoadDB = async () => {
  await ConnectDB();
};

export async function POST(request: NextRequest) {
  // Load the DB before handling request
  await LoadDB();

  // Parse incoming JSON data
  const { email } = await request.json(); // request.json() to handle JSON payload

  // Check if email is present
  if (!email) {
    return NextResponse.json({ success: false, msg: "Email is required" });
  }

  try {
    // Create the new email in the database
    await emailModel.create({ email });

    // Return success response
    return NextResponse.json({ success: true, msg: "Email subscribed" });
  } catch (error) {
    // Handle any errors
    console.error("Error saving email:", error);
    return NextResponse.json({ success: false, msg: "Error subscribing email" });
  }
}

export async function GET(request: NextRequest) {
    try {
      const emails = await emailModel.find({});
      return NextResponse.json({ emails }, { status: 200 });
    } catch (error) {
      console.error("Error fetching emails:", error);
      return NextResponse.json({ success: false, msg: "Error fetching emails" }, { status: 500 });
    }
  }



  export async function DELETE(req:NextRequest) {
    const id = await req.nextUrl.searchParams.get("id")
    await emailModel.findByIdAndDelete(id)
    return NextResponse.json({success:true,msg:"Email Deleted"})
    
  }
