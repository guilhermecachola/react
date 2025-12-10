import Image from "next/image";
import { Product } from "@/app/lab11/models/interfaces";
import Link from 'next/link'
import { 
    Card,
    CardHeader,
    CardTitle, 
    CardContent 
} from "@/components/ui/card";



/* Usage isto é o que está no shadcn.com
Copy
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
Copy
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
    <CardAction>Card Action</CardAction>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>
*/

export default function ProdutoCard({ produto }: { produto: Product }) {
  const linkFinal = "https://deisishop.pythonanywhere.com" + produto.image;
  return (
    <Card className="shadow-md hover:shadow-xl transition p-3 bg-blue-300 border-blue-600  border-2">
      
      <CardHeader  >
        <CardTitle className="text-lg font-semibold text-blue-600 h-12">
          {produto.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Image
          src={linkFinal}
          alt={produto.title}
          width={300}
          height={300}
          className="rounded-lg object-cover w-full h-48 "
        />

        <p className="mt-3 text-xl font-bold flex justify-center text-blue-600 ">
          € {produto.price}
        </p>
                <Link  href="@app/lab11/produtos/${id}" className="flex justify-center border-2 border-blue-800 mt-2 font-bold rounded-lg bg-gradient-to-b from-blue-600 to-blue-400" ><button>+Informação</button></Link>

      </CardContent>
    </Card>
  );
}
