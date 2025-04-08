import { NextResponse } from "next/server";
import { z } from "zod";
import fs from 'fs';
import path from 'path';

const propertySchema = z.object({
  address: z.string().min(1, "Address is required"),
  state: z.string().min(1, "State is required"),
  type: z.string().min(1, "Property type is required"),
  marketValue: z.number().min(0, "Market value must be positive"),
});

type Property = z.infer<typeof propertySchema> & {
  id: string;
};

// File-based storage
const dataFilePath = path.join(process.cwd(), 'data', 'properties.json');

// Ensure the data directory exists
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize the properties file if it doesn't exist
if (!fs.existsSync(dataFilePath)) {
  fs.writeFileSync(dataFilePath, JSON.stringify([]));
}

// Helper functions for file operations
function readProperties(): Property[] {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading properties:", error);
    return [];
  }
}

function writeProperties(properties: Property[]): void {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(properties, null, 2));
  } catch (error) {
    console.error("Error writing properties:", error);
  }
}

export async function GET() {
  try {
    const properties = readProperties();
    return NextResponse.json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    return NextResponse.json(
      { error: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Received property data:", body);
    
    const validatedData = propertySchema.parse(body);
    console.log("Validated property data:", validatedData);
    
    const newProperty = {
      id: Date.now().toString(),
      ...validatedData,
    };
    
    // Read existing properties
    const properties = readProperties();
    
    // Add the new property
    properties.push(newProperty);
    
    // Write back to file
    writeProperties(properties);
    
    console.log("Created new property:", newProperty);
    
    return NextResponse.json(newProperty, { status: 201 });
  } catch (error) {
    console.error("Error creating property:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { errors: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
} 