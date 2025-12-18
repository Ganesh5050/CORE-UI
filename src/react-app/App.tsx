import { BrowserRouter as Router, Routes, Route } from "react-router";
import HomePage from "@/react-app/pages/Home";
import GetStarted from "@/react-app/pages/GetStarted";
import SplitText from "@/react-app/pages/SplitText";
import BlurText from "@/react-app/pages/BlurText";
import CircularText from "@/react-app/pages/CircularText";
import TextType from "@/react-app/pages/TextType";
import Shuffle from "@/react-app/pages/Shuffle";
import ShinyText from "@/react-app/pages/ShinyText";
import TextPressure from "@/react-app/pages/TextPressure";
import CurvedLoop from "@/react-app/pages/CurvedLoop";
import FuzzyText from "@/react-app/pages/FuzzyText";
import GradientText from "@/react-app/pages/GradientText";
import FallingText from "@/react-app/pages/FallingText";
import TextCursor from "@/react-app/pages/TextCursor";
import DecryptedText from "@/react-app/pages/DecryptedText";
import TrueFocus from "@/react-app/pages/TrueFocus";
import ScrollFloat from "@/react-app/pages/ScrollFloat";
import ScrollReveal from "@/react-app/pages/ScrollReveal";
import ASCIIText from "@/react-app/pages/ASCIIText";
import ScrambledText from "@/react-app/pages/ScrambledText";
import RotatingText from "@/react-app/pages/RotatingText";
import GlitchText from "@/react-app/pages/GlitchText";
import ScrollVelocity from "@/react-app/pages/ScrollVelocity";
import VariableProximity from "@/react-app/pages/VariableProximity";
import CountUp from "@/react-app/pages/CountUp";
import AnimatedContent from "@/react-app/pages/AnimatedContent";
import FadeContent from "@/react-app/pages/FadeContent";
import ElectricBorder from "@/react-app/pages/ElectricBorder";
import PixelTransition from "@/react-app/pages/PixelTransition";
import GlareHover from "@/react-app/pages/GlareHover";
import LogoLoop from "@/react-app/pages/LogoLoop";
import TargetCursor from "@/react-app/pages/TargetCursor";
import LaserFlow from "@/react-app/pages/LaserFlow";
import MagnetLines from "@/react-app/pages/MagnetLines";
import GhostCursor from "@/react-app/pages/GhostCursor";
import GradualBlur from "@/react-app/pages/GradualBlur";
import ClickSpark from "@/react-app/pages/ClickSpark";
import Magnet from "@/react-app/pages/Magnet";
import StickerPeel from "@/react-app/pages/StickerPeel";
import PixelTrail from "@/react-app/pages/PixelTrail";
import Cubes from "@/react-app/pages/Cubes";
import MetallicPaint from "@/react-app/pages/MetallicPaint";
import Noise from "@/react-app/pages/Noise";
import ShapeBlur from "@/react-app/pages/ShapeBlur";
import Crosshair from "@/react-app/pages/Crosshair";
import ImageTrail from "@/react-app/pages/ImageTrail";
import Ribbons from "@/react-app/pages/Ribbons";
import SplashCursor from "@/react-app/pages/SplashCursor";
import MetaBalls from "@/react-app/pages/MetaBalls";
import BlobCursor from "@/react-app/pages/BlobCursor";
import StarBorder from "@/react-app/pages/StarBorder";
import ScrollStack from "@/react-app/pages/ScrollStack";
import AnimatedList from "@/react-app/pages/AnimatedList";
import LiquidEther from "@/react-app/pages/LiquidEther";
import ComponentPreview from "@/react-app/pages/ComponentPreview";

// New Components
import BubbleMenu from "@/react-app/pages/BubbleMenu";
import MagicBento from "@/react-app/pages/MagicBento";
import CircularGallery from "@/react-app/pages/CircularGallery";
import CardNav from "@/react-app/pages/CardNav";
import Stack from "@/react-app/pages/Stack";
import FluidGlass from "@/react-app/pages/FluidGlass";
import PillNav from "@/react-app/pages/PillNav";
import TiltedCard from "@/react-app/pages/TiltedCard";
import Masonry from "@/react-app/pages/Masonry";
import GlassSurface from "@/react-app/pages/GlassSurface";
import DomeGallery from "@/react-app/pages/DomeGallery";
import ChromaGrid from "@/react-app/pages/ChromaGrid";
import Folder from "@/react-app/pages/Folder";
import StaggeredMenu from "@/react-app/pages/StaggeredMenu";
import ModelViewer from "@/react-app/pages/ModelViewer";
import Lanyard from "@/react-app/pages/Lanyard";
import ProfileCard from "@/react-app/pages/ProfileCard";
import Dock from "@/react-app/pages/Dock";
import GooeyNav from "@/react-app/pages/GooeyNav";
import PixelCard from "@/react-app/pages/PixelCard";
import Carousel from "@/react-app/pages/Carousel";
import SpotlightCard from "@/react-app/pages/SpotlightCard";
import FlyingPosters from "@/react-app/pages/FlyingPosters";
import CardSwap from "@/react-app/pages/CardSwap";
import GlassIcons from "@/react-app/pages/GlassIcons";
import DecayCard from "@/react-app/pages/DecayCard";
import FlowingMenu from "@/react-app/pages/FlowingMenu";
import ElasticSlider from "@/react-app/pages/ElasticSlider";
import Counter from "@/react-app/pages/Counter";
import InfiniteMenu from "@/react-app/pages/InfiniteMenu";
import Stepper from "@/react-app/pages/Stepper";
import BounceCards from "@/react-app/pages/BounceCards";
import Prism from "@/react-app/pages/Prism";
import DarkVeil from "@/react-app/pages/DarkVeil";
import Silk from "@/react-app/pages/Silk";
import LightRays from "@/react-app/pages/LightRays";
import PixelBlast from "@/react-app/pages/PixelBlast";
import ColorBends from "@/react-app/pages/ColorBends";
import Aurora from "@/react-app/pages/Aurora";
import Plasma from "@/react-app/pages/Plasma";
import Particles from "@/react-app/pages/Particles";
import GradientBlinds from "@/react-app/pages/GradientBlinds";
import GridScan from "@/react-app/pages/GridScan";
import Beams from "@/react-app/pages/Beams";
import Lightning from "@/react-app/pages/Lightning";
import PrismaticBurst from "@/react-app/pages/PrismaticBurst";
import Galaxy from "@/react-app/pages/Galaxy";
import Dither from "@/react-app/pages/Dither";
import FaultyTerminal from "@/react-app/pages/FaultyTerminal";
import RippleGrid from "@/react-app/pages/RippleGrid";
import DotGrid from "@/react-app/pages/DotGrid";
import Threads from "@/react-app/pages/Threads";
import Hyperspeed from "@/react-app/pages/Hyperspeed";
import Iridescence from "@/react-app/pages/Iridescence";
import Waves from "@/react-app/pages/Waves";
import GridDistortion from "@/react-app/pages/GridDistortion";
import Ballpit from "@/react-app/pages/Ballpit";
import Orb from "@/react-app/pages/Orb";
import LetterGlitch from "@/react-app/pages/LetterGlitch";
import GridMotion from "@/react-app/pages/GridMotion";
import Squares from "@/react-app/pages/Squares";
import LiquidChrome from "@/react-app/pages/LiquidChrome";
import Balatro from "@/react-app/pages/Balatro";

// Others Category
import Buttons from "@/react-app/pages/others/Buttons";
import Cards from "@/react-app/pages/others/Cards";
import Navbars from "@/react-app/pages/others/Navbars";
import Overlays from "@/react-app/pages/others/Overlays";
import Preloaders from "@/react-app/pages/others/Preloaders";


// Trigger HMR
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/preview" element={<ComponentPreview />} />
        <Route path="/get-started/index" element={<GetStarted />} />

        {/* Others Category */}
        <Route path="/others/buttons" element={<Buttons />} />
        <Route path="/others/buttons/:buttonId" element={<Buttons />} />
        <Route path="/others/cards" element={<Cards />} />
        <Route path="/others/cards/:cardId" element={<Cards />} />
        <Route path="/others/navbars" element={<Navbars />} />
        <Route path="/others/navbars/:navbarId" element={<Navbars />} />
        <Route path="/others/overlays" element={<Overlays />} />
        <Route path="/others/overlays/:overlayId" element={<Overlays />} />
        <Route path="/others/preloaders" element={<Preloaders />} />
        <Route path="/others/preloaders/:preloaderId" element={<Preloaders />} />

        {/* Text Animations */}
        <Route path="/text-animations/split-text" element={<SplitText />} />
        <Route path="/text-animations/blur-text" element={<BlurText />} />
        <Route path="/text-animations/circular-text" element={<CircularText />} />
        <Route path="/text-animations/text-type" element={<TextType />} />
        <Route path="/text-animations/shuffle" element={<Shuffle />} />
        <Route path="/text-animations/shiny-text" element={<ShinyText />} />
        <Route path="/text-animations/text-pressure" element={<TextPressure />} />
        <Route path="/text-animations/curved-loop" element={<CurvedLoop />} />
        <Route path="/text-animations/fuzzy-text" element={<FuzzyText />} />
        <Route path="/text-animations/gradient-text" element={<GradientText />} />
        <Route path="/text-animations/falling-text" element={<FallingText />} />
        <Route path="/text-animations/text-cursor" element={<TextCursor />} />
        <Route path="/text-animations/decrypted-text" element={<DecryptedText />} />
        <Route path="/text-animations/true-focus" element={<TrueFocus />} />
        <Route path="/text-animations/scroll-float" element={<ScrollFloat />} />
        <Route path="/text-animations/scroll-reveal" element={<ScrollReveal />} />
        <Route path="/text-animations/ascii-text" element={<ASCIIText />} />
        <Route path="/text-animations/scrambled-text" element={<ScrambledText />} />
        <Route path="/text-animations/rotating-text" element={<RotatingText />} />
        <Route path="/text-animations/glitch-text" element={<GlitchText />} />
        <Route path="/text-animations/scroll-velocity" element={<ScrollVelocity />} />
        <Route path="/text-animations/variable-proximity" element={<VariableProximity />} />
        <Route path="/text-animations/count-up" element={<CountUp />} />

        {/* Animations */}
        <Route path="/animations/animated-content" element={<AnimatedContent />} />
        <Route path="/animations/fade-content" element={<FadeContent />} />
        <Route path="/animations/electric-border" element={<ElectricBorder />} />
        <Route path="/animations/pixel-transition" element={<PixelTransition />} />
        <Route path="/animations/glare-hover" element={<GlareHover />} />
        <Route path="/animations/logo-loop" element={<LogoLoop />} />
        <Route path="/animations/target-cursor" element={<TargetCursor />} />
        <Route path="/animations/laser-flow" element={<LaserFlow />} />
        <Route path="/animations/magnet-lines" element={<MagnetLines />} />
        <Route path="/animations/ghost-cursor" element={<GhostCursor />} />
        <Route path="/animations/gradual-blur" element={<GradualBlur />} />
        <Route path="/animations/click-spark" element={<ClickSpark />} />
        <Route path="/animations/magnet" element={<Magnet />} />
        <Route path="/animations/sticker-peel" element={<StickerPeel />} />
        <Route path="/animations/pixel-trail" element={<PixelTrail />} />
        <Route path="/animations/cubes" element={<Cubes />} />
        <Route path="/animations/metallic-paint" element={<MetallicPaint />} />
        <Route path="/animations/noise" element={<Noise />} />
        <Route path="/animations/shape-blur" element={<ShapeBlur />} />
        <Route path="/animations/crosshair" element={<Crosshair />} />
        <Route path="/animations/image-trail" element={<ImageTrail />} />
        <Route path="/animations/ribbons" element={<Ribbons />} />
        <Route path="/animations/splash-cursor" element={<SplashCursor />} />
        <Route path="/animations/meta-balls" element={<MetaBalls />} />
        <Route path="/animations/blob-cursor" element={<BlobCursor />} />
        <Route path="/animations/star-border" element={<StarBorder />} />
        <Route path="/animations/scroll-stack" element={<ScrollStack />} />

        {/* Components */}
        <Route path="/components/animated-list" element={<AnimatedList />} />

        {/* Effects */}
        <Route path="/effects/laser-flow" element={<LaserFlow />} />

        {/* Backgrounds */}
        <Route path="/backgrounds/liquid-ether" element={<LiquidEther />} />
        <Route path="/backgrounds/prism" element={<Prism />} />
        <Route path="/backgrounds/dark-veil" element={<DarkVeil />} />
        <Route path="/backgrounds/silk" element={<Silk />} />
        <Route path="/backgrounds/light-rays" element={<LightRays />} />
        <Route path="/backgrounds/pixel-blast" element={<PixelBlast />} />
        <Route path="/backgrounds/color-bends" element={<ColorBends />} />
        <Route path="/backgrounds/aurora" element={<Aurora />} />
        <Route path="/backgrounds/plasma" element={<Plasma />} />
        <Route path="/backgrounds/particles" element={<Particles />} />
        <Route path="/backgrounds/gradient-blinds" element={<GradientBlinds />} />
        <Route path="/backgrounds/grid-scan" element={<GridScan />} />
        <Route path="/backgrounds/beams" element={<Beams />} />
        <Route path="/backgrounds/lightning" element={<Lightning />} />
        <Route path="/backgrounds/prismatic-burst" element={<PrismaticBurst />} />
        <Route path="/backgrounds/galaxy" element={<Galaxy />} />
        <Route path="/backgrounds/dither" element={<Dither />} />
        <Route path="/backgrounds/faulty-terminal" element={<FaultyTerminal />} />
        <Route path="/backgrounds/ripple-grid" element={<RippleGrid />} />
        <Route path="/backgrounds/dot-grid" element={<DotGrid />} />
        <Route path="/backgrounds/threads" element={<Threads />} />
        <Route path="/backgrounds/hyperspeed" element={<Hyperspeed />} />
        <Route path="/backgrounds/iridescence" element={<Iridescence />} />
        <Route path="/backgrounds/waves" element={<Waves />} />
        <Route path="/backgrounds/grid-distortion" element={<GridDistortion />} />
        <Route path="/backgrounds/ballpit" element={<Ballpit />} />
        <Route path="/backgrounds/orb" element={<Orb />} />
        <Route path="/backgrounds/letter-glitch" element={<LetterGlitch />} />
        <Route path="/backgrounds/grid-motion" element={<GridMotion />} />
        <Route path="/backgrounds/squares" element={<Squares />} />
        <Route path="/backgrounds/liquid-chrome" element={<LiquidChrome />} />
        <Route path="/backgrounds/balatro" element={<Balatro />} />

        {/* UI Components */}
        <Route path="/components/bubble-menu" element={<BubbleMenu />} />
        <Route path="/components/magic-bento" element={<MagicBento />} />
        <Route path="/components/circular-gallery" element={<CircularGallery />} />
        <Route path="/components/card-nav" element={<CardNav />} />
        <Route path="/components/stack" element={<Stack />} />
        <Route path="/components/fluid-glass" element={<FluidGlass />} />
        <Route path="/components/pill-nav" element={<PillNav />} />
        <Route path="/components/tilted-card" element={<TiltedCard />} />
        <Route path="/components/masonry" element={<Masonry />} />
        <Route path="/components/glass-surface" element={<GlassSurface />} />
        <Route path="/components/dome-gallery" element={<DomeGallery />} />
        <Route path="/components/chroma-grid" element={<ChromaGrid />} />
        <Route path="/components/folder" element={<Folder />} />
        <Route path="/components/staggered-menu" element={<StaggeredMenu />} />
        <Route path="/components/model-viewer" element={<ModelViewer />} />
        <Route path="/components/lanyard" element={<Lanyard />} />
        <Route path="/components/profile-card" element={<ProfileCard />} />
        <Route path="/components/dock" element={<Dock />} />
        <Route path="/components/gooey-nav" element={<GooeyNav />} />
        <Route path="/components/pixel-card" element={<PixelCard />} />
        <Route path="/components/carousel" element={<Carousel />} />
        <Route path="/components/spotlight-card" element={<SpotlightCard />} />
        <Route path="/components/flying-posters" element={<FlyingPosters />} />
        <Route path="/components/card-swap" element={<CardSwap />} />
        <Route path="/components/glass-icons" element={<GlassIcons />} />
        <Route path="/components/decay-card" element={<DecayCard />} />
        <Route path="/components/flowing-menu" element={<FlowingMenu />} />
        <Route path="/components/elastic-slider" element={<ElasticSlider />} />
        <Route path="/components/counter" element={<Counter />} />
        <Route path="/components/infinite-menu" element={<InfiniteMenu />} />
        <Route path="/components/stepper" element={<Stepper />} />
        <Route path="/components/bounce-cards" element={<BounceCards />} />
      </Routes>
    </Router>
  );
}

