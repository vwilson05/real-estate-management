"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function TestPage() {
  return (
    <div className="p-8 space-y-8">
      {/* Basic Tailwind Test */}
      <section className="space-y-4">
        <div className="bg-blue-500 text-white p-4 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Basic Tailwind Works!</h2>
          <p>This confirms Tailwind is properly configured.</p>
        </div>
      </section>

      {/* UI Components Test */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">UI Components</h2>
        <div className="flex gap-4">
          <Button variant="default">Default Button</Button>
          <Button variant="destructive">Destructive Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="ghost">Ghost Button</Button>
        </div>
      </section>

      {/* Card Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Regular Card</CardTitle>
            <CardDescription>This is a standard card component</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Main content area of the card.</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Submit</Button>
          </CardFooter>
        </Card>

        <Card className="bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle>Primary Card</CardTitle>
            <CardDescription className="text-primary-foreground/80">Using primary color scheme</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This card uses the theme's primary colors.</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Warning Card</CardTitle>
            <CardDescription>Using destructive styling</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This card has destructive styling elements.</p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
} 