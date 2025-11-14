import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-indigo-500 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-6xl flex-col items-center justify-between py-32 px-16 bg-indigo-400 dark:bg-black sm:items-start">
        <div className="flex flex-col justify-center items-center w-full gap-6 text-center sm:items-start sm:text-left">
          <Card className="w-full justify-center">
            <CardHeader>
              <CardTitle className="text-lg">Processar Email</CardTitle>
            </CardHeader>
            <CardContent>
              {/* aqui seu form/textarea/upload */}
              <div className="mb-4">
                <textarea
                  className="w-full p-3 border rounded"
                  rows={6}
                  placeholder="Cole o conteúdo do email aqui"
                />
              </div>

              <div className="flex gap-2">
                <Button>Processar</Button>
                <Button variant="ghost">Limpar</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
