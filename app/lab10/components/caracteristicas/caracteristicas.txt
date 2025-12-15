/*
1. A Regra Mais Importante: Client vs Server 
Se vais usar Hooks (useState, useEffect, useParams, useSWR) ou adicionar 
interatividade (onClick), tens obrigatoriamente de colocar isto na primeira linha do 
ficheiro: 
TypeScript 
"use client"; 
Sem isto, o Next.js vai dar erro ao usar hooks. 
2. Componentes e Props (Interfaces) 
Como criar um novo componente que recebe dados. 
Estrutura Base: 
TypeScript 
// 1. Importações 
import { useState } from "react"; 
// 2. Interface (Define o que o componente recebe) [cite: 2812, 2763] 
interface BotaoProps { 
titulo: string; 
cor?: string; // O '?' torna opcional [cite: 2802] 
onClick: () => void; // Função passada pelo pai [cite: 3169] 
} 
// 3. Componente [cite: 2541, 2826] 
export default function Botao({ titulo, cor = "blue", onClick }: BotaoProps) { 
  return ( 
    <button  
      onClick={onClick} 
      className={`bg-${cor}-500 text-white p-2 rounded`} // Exemplo com Tailwind 
    > 
      {titulo} 
    </button> 
  ); 
} 
Como usar noutro componente (Pai): 
TypeScript 
<Botao titulo="Gravar" onClick={() => alert('Ola')} /> 
 
3. Gestão de Estado (useState) 
Usado para contadores, mostrar/esconder coisas, guardar inputs. 
Importação: 
TypeScript 
import { useState } from "react"; [cite: 2990] 
Sintaxe: 
TypeScript 
// Declaração [cite: 2992] 
const [contador, setContador] = useState<number>(0);  
Como alterar o valor: 
1. Valor direto: setContador(5); 
2. Baseado no anterior (ex: incrementar):  
TypeScript 
setContador(prev => prev + 1); 
Array ou Objeto no State: Se tiveres de adicionar um item a uma lista (ex: carrinho): 
TypeScript 
const [lista, setLista] = useState<string[]>([]); 
 
function adicionar(novoItem: string) { 
// Cria um novo array com o anterior + o novo [cite: 3092] 
setLista(prev => [...prev, novoItem]);  
} 
4. Efeitos (useEffect) 
Usado para executar código automaticamente quando a página carrega ou quando uma 
variável muda (ex: iniciar um timer, verificar algo). 
Importação: 
TypeScript 
import { useEffect } from "react"; [cite: 3214] 
Sintaxe: 
TypeScript 
useEffect(() => { 
// O código aqui corre quando o componente monta 
console.log("Componente iniciou"); 
// Opcional: Cleanup (corre quando o componente é destruído) [cite: 3260] 
return () => { console.log("Limpeza..."); }; 
}, []); // [] vazio = corre apenas 1 vez [cite: 3196] 
Se tiver dependências: 
TypeScript 
useEffect(() => { 
console.log("O contador mudou para:", contador); 
}, [contador]); // Corre sempre que 'contador' mudar [cite: 3201] 
5. Fetch de Dados (useSWR) 
A forma ensinada para buscar dados de APIs externas. Trata de loading e erros 
automaticamente. 
Importação: 
TypeScript 
import useSWR from "swr"; [cite: 3301] 
Fetcher (Copiar e colar sempre): 
TypeScript 
const fetcher = (url: string) => fetch(url).then((res) => res.json()); [cite: 3303] 
Uso no Componente: 
TypeScript 
export default function ListaProdutos() { 
  // A URL pode ser externa ou interna (/api/...) 
  const { data, error, isLoading } = useSWR('https://api.exemplo.com/produtos', fetcher); 
[cite: 3304] 
 
  if (isLoading) return <div>A carregar...</div>; [cite: 3318] 
  if (error) return <div>Erro ao carregar dados.</div>; [cite: 3317] 
 
  return ( 
    <ul> 
  /*    {/* O 'data' contém a resposta da API */} 
   /*   {data.map((prod: any) => ( 
        <li key={prod.id}>{prod.nome}</li> 
      ))} 
    </ul> 
  ); 
} 
 
6. Rotas Dinâmicas (useParams) 
Se tiveres uma página que depende de um ID no URL (ex: /produtos/15), precisas disto 
para saber que o ID é 15. 
Estrutura de Pastas: A pasta tem de ter o nome entre parêntesis retos: 
app/produtos/[id]/page.tsx. 
Código (page.tsx): 
TypeScript 
"use client"; // Necessário para useParams 
import { useParams } from "next/navigation"; [cite: 3360] 
export default function DetalheProduto() { 
const params = useParams();  
const id = params.id; // 'id' corresponde ao nome da pasta [id] [cite: 3358] 
return <h1>Estás a ver o produto {id}</h1>; 
} 
7. Navegação via Código (useRouter) 
Para redirecionar o utilizador depois de clicar num botão (sem usar o componente 
<Link>). 
Importação: 
TypeScript 
import { useRouter } from "next/navigation"; // Nota: é next/navigation no App Router 
Uso: 
TypeScript 
export default function BotaoLogin() { 
const router = useRouter(); [cite: 3374] 
const handleLogin = () => { 
// Lógica de login... 
router.push('/dashboard'); // Redireciona para outra página [cite: 3376] 
}; 
return <button onClick={handleLogin}>Entrar</button>; 
} 
8. Renderização Condicional (Mostrar/Esconder) 
Como mostrar coisas diferentes baseadas no estado. 
• Ternário (Se... então... senão): 
TypeScript 
{isLogado ? <Dashboard /> : <LoginButton />} 
• Operador && (Se... então mostra): 
TypeScript 
{isAdmin && <BotaoApagar />}  
(Se isAdmin for true, mostra o botão. Se false, não mostra nada). 
9. Listas no JSX (.map) 
Como transformar um array de dados em HTML. 
TypeScript 
const frutas = ["Maçã", "Banana", "Pêra"]; 
return ( 
<ul> 
{frutas.map((fruta, index) => ( 
<li key={index}>{fruta}</li> // O 'key' é obrigatório! [cite: 2700] 
))} 
</ul> 
); 
10. API Routes (Backend) 
Se te pedirem para criar um endpoint no próprio Next.js. 
Onde criar: Pasta app/api/minha-rota/route.ts. 
Sintaxe (GET): 
TypeScript 
import { NextResponse } from 'next/server'; 
export async function GET() { 
const dados = { mensagem: "Olá mundo" }; 
return Response.json(dados, { status: 200 }); 
} 
Sintaxe (POST - Receber dados): 
TypeScript 
export async function POST(request: Request) { 
const body = await request.json(); // Ler o que veio do frontend 
// ... fazer algo com o body ... 
return Response.json({ status: "Recebido" }); 
} 
Resumo de Checklist para a Defesa: 
1. Vais criar um componente novo? Cria o ficheiro, põe export default function... e 
não esqueças o "use client". 
2. Vais adicionar estado? const [val, setVal] = useState(...). 
3. Vais buscar dados? Copia o fetcher e usa useSWR(url, fetcher). 
4. Vais criar uma página nova? Cria uma pasta dentro de app com um ficheiro 
page.tsx. 
5. A página precisa de um ID? Cria pasta [id] e usa useParams().

Leaflet é uma biblioteca JavaScript leve para criar mapas interativos na web. É fácil de usar e compatível com dispositivos móveis.

Passos básicos para usar Leaflet
Incluir a biblioteca


Copy
<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
Criar um container HTML


Copy
<div id="map" style="height: 400px;"></div>
Criar o mapa


Copy
const map = L.map('map').setView([latitude, longitude], zoom);
Adicionar uma camada de mapa (tiles)


Copy
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);
Componentes chave do Leaflet
Componente
Função
L.map()

Cria o mapa em um container HTML

L.tileLayer()

Adiciona camadas de mapa (tiles)

L.marker()

Cria marcadores em coordenadas específicas

L.popup()

Cria popups de informação vinculados a marcadores ou posições

L.circle() / L.polygon()

Desenha círculos ou polígonos no mapa

map.setView()

Define centro e zoom do mapa

map.on()

Permite reagir a eventos do mapa (click, mousemove, etc.)

Eventos mais usados
map.on('click', callback) → detecta cliques no mapa

marker.on('click', callback) → detecta cliques em marcadores

map.on('move', callback) → detecta movimento do mapa

Fluxo de trabalho resumido
Criar o mapa (L.map)

Adicionar camada de tiles (L.tileLayer)

Adicionar marcadores ou formas geométricas (L.marker, L.circle, L.polygon)

Configurar eventos (on, bindPopup)

Atualizar dinamicamente se necessário (setLatLng, addTo, remove)

<h3>A Minha Posição no Mapa</h3>
<div id="map" style="height: 300px;"></div>
<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />

<script>
navigator.geolocation.getCurrentPosition(pos => {
  const lat = pos.coords.latitude;
  const lng = pos.coords.longitude;

  const map = L.map('map').setView([lat, lng], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  L.marker([lat, lng]).addTo(map).bindPopup("Você está aqui!").openPopup();
});
</script>

No código:


Copy
navigator.geolocation.getCurrentPosition((pos) => {
  console.log(pos.coords.latitude, pos.coords.longitude);
});
pos é o objeto que representa a posição atual.

Ele é passado automaticamente como argumento para a função de callback (successCallback).

Você não precisa definir pos antes — a função do navegador chama o callback com o objeto de posição.

Estrutura do objeto pos:

Copy
pos = {
  coords: {
    latitude: 38.736946,
    longitude: -9.142685,
    altitude: null,
    accuracy: 10,      // precisão em metros
    altitudeAccuracy: null,
    heading: null,
    speed: null
  },
  timestamp: 1698360000000 // data/hora da posição
}
Uso típico:

Copy
navigator.geolocation.getCurrentPosition((pos) => {
  const lat = pos.coords.latitude;
  const lng = pos.coords.longitude;
  console.log(`Latitude: ${lat}, Longitude: ${lng}`);
  // aqui podemos, por exemplo, centrar um mapa Leaflet ou mostrar a posição na tela
});

Mapa com marcador simples

Copy
<div id="map" style="height: 300px;"></div>

<script>
const map = L.map('map').setView([38.736946, -9.142685], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const marker = L.marker([38.736946, -9.142685]).addTo(map);

console.log(marker.getLatLng());
</script>
🧩 Exercício 2 – Vários marcadores e popups

Copy
<div id="map" style="height: 300px;"></div>

<script>
const map = L.map('map').setView([38.736946, -9.142685], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

const locais = [
  { nome: 'Praça do Comércio', coords: [38.7071, -9.1355] },
  { nome: 'Torre de Belém', coords: [38.6916, -9.2159] }
];

locais.forEach(l => {
  const m = L.marker(l.coords).addTo(map);
  m.bindPopup(l.nome);
  console.log(l.nome, m.getLatLng());
});
</script>

<div id="map" style="height: 300px;"></div>

<script>
const map = L.map('map').setView([38.736946, -9.142685], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

map.on('click', e => {
  L.popup()
    .setLatLng(e.latlng)
    .setContent(`Você clicou em ${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)}`)
    .openOn(map);

  console.log(e.latlng);
});
</script>

<div id="map" style="height: 300px;"></div>

<script>
const map = L.map('map').setView([38.736946, -9.142685], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

const locais = [
  { nome: 'Praça do Comércio', coords: [38.7071, -9.1355] },
  { nome: 'Torre de Belém', coords: [38.6916, -9.2159] }
];

locais.forEach(l => {
  const m = L.marker(l.coords).addTo(map);
  m.bindPopup(l.nome);
  console.log(l.nome, m.getLatLng());
});
</script>

<div id="map" style="height: 300px;"></div>

<script>
const map = L.map('map').setView([38.736946, -9.142685], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

map.on('click', e => {
  L.popup()
    .setLatLng(e.latlng)
    .setContent(`Você clicou em ${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)}`)
    .openOn(map);

  console.log(e.latlng);
});
</script>

Navigator
🌐 navigator em JavaScript
O navigator é um objeto global do navegador que fornece informações sobre o navegador, dispositivo e ambiente do usuário, além de permitir acesso a APIs modernas.

Ele é acessível diretamente em qualquer script:


Copy
console.log(navigator);
🔹 O que ele fornece / permite
Categoria  Propriedade / Método  Exemplo de uso
Informações do navegador  navigator.userAgent  Saber qual navegador está em uso

Plataforma / Sistema  navigator.platform, navigator.language  Detectar sistema operativo ou idioma

Online / Offline  navigator.onLine  Verificar se o usuário está conectado à internet

Geolocalização  navigator.geolocation  Obter posição do usuário (getCurrentPosition, watchPosition)

Multimédia  navigator.mediaDevices  Aceder à câmera e microfone (getUserMedia)

Hardware / Sensores  navigator.connection, navigator.deviceMemory  Detectar velocidade da conexão, RAM, etc.

APIs experimentais  navigator.clipboard, navigator.serviceWorker, navigator.share  Copiar texto, registrar service workers, compartilhar dados

Navigator
📌 1️⃣ Capturar vídeo e foto – Camera / MediaDevices API
navigator.mediaDevices.getUserMedia()
Permite aceder à câmara e microfone do dispositivo.


Copy
// Capturar vídeo da câmera
navigator.mediaDevices.getUserMedia({ video: true, audio: false })
  .then(stream => {
    const video = document.createElement('video');
    video.srcObject = stream;
    video.autoplay = true;
    document.body.appendChild(video);
  })
  .catch(err => console.error("Erro:", err));
Para tirar uma foto, basta desenhar o frame num <canvas>:


Copy
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
context.drawImage(video, 0, 0, 320, 240);
const dataURL = canvas.toDataURL('image/png'); // imagem em base64
console.log(dataURL);
📌 2️⃣ Saber a posição – Geolocation API
navigator.geolocation.getCurrentPosition()
Retorna latitude e longitude do dispositivo.


Copy
navigator.geolocation.getCurrentPosition(position => {
  console.log("Latitude:", position.coords.latitude);
  console.log("Longitude:", position.coords.longitude);
});
Também permite monitorizar mudanças de posição:


Copy
navigator.geolocation.watchPosition(position => {
  console.log("Atualização:", position.coords.latitude, position.coords.longitude);
});
📌 3️⃣ Gravar vídeo – MediaRecorder API
Permite gravar streams de vídeo/áudio capturados pelo getUserMedia.


Copy
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then(stream => {
    const mediaRecorder = new MediaRecorder(stream);
    const chunks = [];

    mediaRecorder.ondataavailable = e => chunks.push(e.data);
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      console.log("Vídeo gravado:", url);
    };

    mediaRecorder.start();
    setTimeout(() => mediaRecorder.stop(), 5000); // grava 5 segundos
  });
💡 Resumo rápido das APIs
Função  API  Método  

Tirar foto  MediaDevices + Canvas  getUserMedia() + canvas.toDataURL()

Gravar vídeo  MediaRecorder  MediaRecorder(stream)

Obter localização  Geolocation  navigator.geolocation.getCurrentPosition() / watchPosition()

1️⃣ Tirar foto com a câmara

Copy
<h3>Tirar Foto</h3>
<video id="video" width="320" height="240" autoplay></video>
<button id="fotoBtn">Tirar Foto</button>
<canvas id="canvas" width="320" height="240"></canvas>

<script>
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const btn = document.getElementById('fotoBtn');
const ctx = canvas.getContext('2d');

// Aceder à câmera
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => video.srcObject = stream)
  .catch(err => console.error(err));

// Tirar foto
btn.addEventListener('click', () => {
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
});
</script>

2️⃣ Gravar vídeo com MediaRecorder

Copy
<h3>Gravar Vídeo</h3>
<video id="v" width="320" height="240" autoplay></video>
<button id="start">Iniciar</button>
<button id="stop">Parar</button>
<video id="playback" width="320" height="240" controls></video>

<script>
const video = document.getElementById('v');
const playback = document.getElementById('playback');
let recorder, chunks = [];

navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then(stream => {
    video.srcObject = stream;
    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = e => chunks.push(e.data);
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      playback.src = URL.createObjectURL(blob);
      chunks = [];
    };
  });

document.getElementById('start').onclick = () => recorder.start();
document.getElementById('stop').onclick = () => recorder.stop();
</script>

3️⃣ Mostrar posição atual num mapa (Leaflet)

Copy
<h3>Minha Posição no Mapa</h3>
<div id="map" style="height: 300px;"></div>
<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />

<script>
navigator.geolocation.getCurrentPosition(pos => {
  const lat = pos.coords.latitude;
  const lng = pos.coords.longitude;

  const map = L.map('map').setView([lat, lng], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  L.marker([lat, lng]).addTo(map).bindPopup("Você está aqui!").openPopup();
});
</script>

4️⃣ Gravar áudio com MediaRecorder

Copy
<h3>Gravar Áudio</h3>
<button id="startAudio">Iniciar</button>
<button id="stopAudio">Parar</button>
<audio id="playAudio" controls></audio>

<script>
let audioRecorder, audioChunks = [];
navigator.mediaDevices.getUserMedia({ audio: true })
  .then(stream => {
    audioRecorder = new MediaRecorder(stream);
    audioRecorder.ondataavailable = e => audioChunks.push(e.data);
    audioRecorder.onstop = () => {
      const blob = new Blob(audioChunks, { type: 'audio/wav' });
      document.getElementById('playAudio').src = URL.createObjectURL(blob);
      audioChunks = [];
    };
  });

document.getElementById('startAudio').onclick = () => audioRecorder.start();
document.getElementById('stopAudio').onclick = () => audioRecorder.stop();
</script>
5️⃣ Sensores do telemóvel (movimento e orientação)

Copy
<h3>Sensores do Telemóvel</h3>
<p id="acc">Aceleração: </p>
<p id="rot">Orientação: </p>

<script>
window.addEventListener('devicemotion', e => {
  document.getElementById('acc').textContent =
    `Aceleração: x=${e.acceleration.x?.toFixed(2)}, y=${e.acceleration.y?.toFixed(2)}, z=${e.acceleration.z?.toFixed(2)}`;
});

window.addEventListener('deviceorientation', e => {
  document.getElementById('rot').textContent =
    `Orientação: alpha=${e.alpha.toFixed(0)}, beta=${e.beta.toFixed(0)}, gamma=${e.gamma.toFixed(0)}`;
});
</script>

🎨 Cores e Backgrounds
Texto: text-gray-800, text-red-500, text-white

Background: bg-blue-500, bg-gray-100, bg-gradient-to-r from-green-400 to-blue-500

Bordas: border, border-2, border-gray-300, border-red-500

Escala de intensidade da cor:

50 → tom mais claro (quase branco, usado como background leve)

100 – 200 → tons claros

300 – 400 → tons médios/claros

500 → tom base (cor principal, mais usada)

600 – 700 → tons mais escuros

800 – 900 → tons bem escuros

950 → quase preto (em algumas paletas)

🔠 Tipografia
Tamanho: text-xs, text-sm, text-base, text-lg, text-xl, text-2xl, …

Peso: font-thin, font-normal, font-bold, font-extrabold

Alinhamento: text-left, text-center, text-right, text-justify

Estilo extra: italic, underline, line-through, uppercase, capitalize 

📐 Espaçamento
Margin (m): m-4, mt-2, mx-auto

Padding (p): p-4, px-6, py-2

Gap (grid/flex): gap-2, gap-4, gap-x-6, gap-y-8

Escala padrão: 0, 1, 2, 4, 8, 12, 16      ( 1 = 0.25rem = 4px). Exemplos:

p-1 → 0.25rem (4px)

m-2 → 0.5rem (8px)

p-3 → 0.75rem (12px)

gap-4 → 1rem (16px)

Escala das direções:

t = top

b = bottom

l = left

r = right

x = eixo horizontal (left + right)

y = eixo vertical (top + bottom)

📦 Layout e Flexbox
Display: block, inline-block, flex, grid, hidden

Flex: flex-row, flex-col, items-center, justify-between, gap-4

Grid: grid-cols-2, grid-cols-3, gap-2, col-span-2

Tamanho: w-full, w-1/2, h-screen, min-h-0, max-w-md

Posicionamento: relative, absolute, fixed, sticky, inset-0 

Z-index: z-0, z-10, z-50 


Copy
<!-- Centering content -->
<div class="flex items-center justify-center h-screen">
  <div>Centered content</div>
</div>

<!-- Responsive grid -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
🎛️ Bordas e Radius
Espessura: border, border-2, border-4 , border-t, border-l-4 

 Escala de espessura (border-width):

border → 1px (padrão)

border-0 → 0px (sem borda)

border-2 → 2px

border-4 → 4px

border-8 → 8px

Cores: border-gray-300, border-blue-500

Arredondamento: rounded, rounded-lg, rounded-full

rounded-b-lg - bottom, ambos os cantos inferiores

rounded-t-lg - top, ambos os cantos superiores

rounded-tl-lg - top left, apenas canto superior esquerdo

Escala de arredondamento (radius):

sm → 2px

default → 4px

md → 6px

lg → 8px

xl → 12px

2xl → 16px

3xl → 24px

full → 9999px (círculo perfeito)

✨ Sombras e Efeitos
Sombras: shadow, shadow-md, shadow-lg, shadow-xl

Opacidade: opacity-50, opacity-75, opacity-100

Hover/Focus: hover:bg-blue-600, focus:ring-2 focus:ring-blue-500

Transições: transition, duration-300, ease-in-out

Overflow: overflow-hidden, overflow-scroll, overflow-auto 

Cursor: cursor-pointer, cursor-not-allowed

📱 Responsividade
Breakpoints (Mobile-First)
Prefixo
Largura mínima
Dispositivos típicos
(nenhum)

0px

Mobile portrait

sm:

640px

Mobile landscape

md:

768px

Tablet

lg:

1024px

Desktop

xl:

1280px

Desktop grande

2xl:

1536px

Desktop muito grande

Exemplo:


Copy
<!-- Texto responsivo -->
<h1 class="text-2xl md:text-4xl lg:text-6xl">
    Título que cresce com a tela
</h1>

<!-- Layout responsivo -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
    <div>Item 4</div>
</div>

<!-- Espaçamento responsivo -->
<div class="p-4 md:p-8 lg:p-12">
    Padding que aumenta com a tela
</div>

<!-- Visibilidade responsiva -->
<div class="block md:hidden">Apenas em mobile</div>
<div class="hidden md:block">Apenas em desktop</div>

