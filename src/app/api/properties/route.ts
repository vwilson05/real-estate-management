import { NextResponse } from "next/server";
import { z } from "zod";

const propertySchema = z.object({
  address: z.string().min(1, "Address is required"),
  state: z.string().min(1, "State is required"),
  type: z.string().min(1, "Property type is required"),
  marketValue: z.number().min(0, "Market value must be positive"),
});

type Property = z.infer<typeof propertySchema> & {
  id: string;
};

// TODO: Replace with actual database operations
const properties: Property[] = [];

export async function GET() {
  return NextResponse.json(properties);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = propertySchema.parse(body);
    
    const newProperty = {
      id: Date.now().toString(),
      ...validatedData,
    };
    
    properties.push(newProperty);
    
    return NextResponse.json(newProperty, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
} 