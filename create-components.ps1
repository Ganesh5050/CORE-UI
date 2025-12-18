$components = @(
  @{Name="ChromaGrid"; Title="Chroma Grid"; Desc="Chromatic grid with color shifting effects"; Deps="framer-motion"},
  @{Name="Folder"; Title="Folder"; Desc="Animated folder component with expand/collapse"; Deps="framer-motion"},
  @{Name="StaggeredMenu"; Title="Staggered Menu"; Desc="Menu with staggered animation entries"; Deps="framer-motion"},
  @{Name="ModelViewer"; Title="Model Viewer"; Desc="3D model viewer with controls"; Deps="three,@react-three/fiber"},
  @{Name="Lanyard"; Title="Lanyard"; Desc="Lanyard-style card component"; Deps="framer-motion"},
  @{Name="ProfileCard"; Title="Profile Card"; Desc="Animated profile card with hover effects"; Deps="framer-motion"},
  @{Name="Dock"; Title="Dock"; Desc="macOS-style dock with magnification"; Deps="framer-motion"},
  @{Name="GooeyNav"; Title="Gooey Nav"; Desc="Navigation with gooey blob effects"; Deps="framer-motion"},
  @{Name="PixelCard"; Title="Pixel Card"; Desc="Pixelated card with retro effects"; Deps="framer-motion"},
  @{Name="Carousel"; Title="Carousel"; Desc="Smooth carousel with touch support"; Deps="framer-motion"},
  @{Name="SpotlightCard"; Title="Spotlight Card"; Desc="Card with spotlight follow effect"; Deps="framer-motion"},
  @{Name="FlyingPosters"; Title="Flying Posters"; Desc="3D flying posters animation"; Deps="three,@react-three/fiber"},
  @{Name="CardSwap"; Title="Card Swap"; Desc="Card swap animation effect"; Deps="framer-motion"},
  @{Name="GlassIcons"; Title="Glass Icons"; Desc="Glassmorphic icon buttons"; Deps="framer-motion"},
  @{Name="DecayCard"; Title="Decay Card"; Desc="Card with decay/glitch effect"; Deps="framer-motion"},
  @{Name="FlowingMenu"; Title="Flowing Menu"; Desc="Menu with flowing animations"; Deps="framer-motion"},
  @{Name="ElasticSlider"; Title="Elastic Slider"; Desc="Slider with elastic physics"; Deps="framer-motion"},
  @{Name="Counter"; Title="Counter"; Desc="Animated counter component"; Deps="framer-motion"},
  @{Name="InfiniteMenu"; Title="Infinite Menu"; Desc="Infinitely scrolling menu"; Deps="framer-motion"},
  @{Name="Stepper"; Title="Stepper"; Desc="Step-by-step progress indicator"; Deps="framer-motion"},
  @{Name="BounceCards"; Title="Bounce Cards"; Desc="Cards with bounce animations"; Deps="framer-motion"},
  @{Name="Prism"; Title="Prism"; Desc="Prismatic color effect background"; Deps=""},
  @{Name="DarkVeil"; Title="Dark Veil"; Desc="Dark veil overlay effect"; Deps=""},
  @{Name="Silk"; Title="Silk"; Desc="Silky smooth gradient background"; Deps=""},
  @{Name="LightRays"; Title="Light Rays"; Desc="Animated light rays effect"; Deps=""},
  @{Name="PixelBlast"; Title="Pixel Blast"; Desc="Pixel explosion effect"; Deps=""},
  @{Name="ColorBends"; Title="Color Bends"; Desc="Bending color waves background"; Deps=""},
  @{Name="Aurora"; Title="Aurora"; Desc="Aurora borealis effect"; Deps=""},
  @{Name="Plasma"; Title="Plasma"; Desc="Plasma effect background"; Deps=""},
  @{Name="Particles"; Title="Particles"; Desc="Particle system background"; Deps=""},
  @{Name="GradientBlinds"; Title="Gradient Blinds"; Desc="Gradient blinds transition effect"; Deps=""},
  @{Name="GridScan"; Title="Grid Scan"; Desc="Scanning grid effect"; Deps=""},
  @{Name="Beams"; Title="Beams"; Desc="Light beams background effect"; Deps=""},
  @{Name="Lightning"; Title="Lightning"; Desc="Lightning bolt effects"; Deps=""},
  @{Name="PrismaticBurst"; Title="Prismatic Burst"; Desc="Prismatic burst animation"; Deps=""},
  @{Name="Galaxy"; Title="Galaxy"; Desc="Galaxy background with stars"; Deps=""},
  @{Name="Dither"; Title="Dither"; Desc="Dithering effect background"; Deps=""},
  @{Name="FaultyTerminal"; Title="Faulty Terminal"; Desc="Glitchy terminal effect"; Deps=""},
  @{Name="RippleGrid"; Title="Ripple Grid"; Desc="Grid with ripple effects"; Deps=""},
  @{Name="DotGrid"; Title="Dot Grid"; Desc="Animated dot grid background"; Deps=""},
  @{Name="Threads"; Title="Threads"; Desc="Animated thread connections"; Deps=""},
  @{Name="Hyperspeed"; Title="Hyperspeed"; Desc="Hyperspeed star field effect"; Deps=""},
  @{Name="Iridescence"; Title="Iridescence"; Desc="Iridescent color shifting"; Deps=""},
  @{Name="Waves"; Title="Waves"; Desc="Animated wave patterns"; Deps=""},
  @{Name="GridDistortion"; Title="Grid Distortion"; Desc="Distorted grid effect"; Deps=""},
  @{Name="Ballpit"; Title="Ballpit"; Desc="Physics-based ball pit"; Deps=""},
  @{Name="Orb"; Title="Orb"; Desc="Floating orb with glow"; Deps=""},
  @{Name="LetterGlitch"; Title="Letter Glitch"; Desc="Glitchy letter animations"; Deps=""},
  @{Name="GridMotion"; Title="Grid Motion"; Desc="Motion grid background"; Deps=""},
  @{Name="Squares"; Title="Squares"; Desc="Animated squares pattern"; Deps=""},
  @{Name="LiquidChrome"; Title="Liquid Chrome"; Desc="Liquid chrome effect"; Deps=""},
  @{Name="Balatro"; Title="Balatro"; Desc="Balatro-style card effects"; Deps="framer-motion"}
)

foreach ($comp in $components) {
  $depsArray = if ($comp.Deps) { "['$($comp.Deps -replace ',', "', '")']" } else { "[]" }
  
  $content = @"
import ComponentDetail from './ComponentDetail';

const $($comp.Name)Preview = () => {
  return (
    <div className="h-[600px] w-full bg-gradient-to-b from-gray-900 to-black rounded-lg flex items-center justify-center">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">$($comp.Title)</h3>
        <p className="text-gray-400">Component preview will appear here</p>
        <p className="text-gray-500 text-sm mt-2">Scroll down for documentation</p>
      </div>
    </div>
  );
};

const usageCode = ``import $($comp.Name) from './$($comp.Name)'

<$($comp.Name) />``; 

const codeExample = ``// Component code will be added here

import React from 'react';

// Component implementation coming soon...
``;

const props = [
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Additional CSS classes',
  },
];

export default function $($comp.Name)Page() {
  return (
    <ComponentDetail
      title="$($comp.Title)"
      description="$($comp.Desc)"
      preview={<$($comp.Name)Preview />}
      code={codeExample}
      usage={usageCode}
      props={props}
      dependencies={$depsArray}
    />
  );
}
"@
  
  $filePath = "src\react-app\pages\$($comp.Name).tsx"
  $content | Out-File -FilePath $filePath -Encoding UTF8 -NoNewline
  Write-Host "Created $($comp.Name).tsx"
}

Write-Host "`nTotal: Created $($components.Count) component pages"
