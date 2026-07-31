/**
 * CreativeBackground – a dense, grunge-style SVG background
 * that adapts to light / dark mode via Tailwind's .dark class.
 *
 * Elements: splatters, dashed winding paths, location pins,
 * wireframe globes, lightning bolt, X marks, stars, dot grids,
 * barcodes, arrows, crosshairs, stamps, halftone patterns,
 * scribbles, scratchy lines, and brand copy.
 */

const CreativeBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0 select-none">
      {/* Base gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />

      {/* Dark mode: deep dark with red vignette corners */}
      <div className="absolute inset-0 hidden dark:block">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(120,20,20,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(120,20,20,0.18),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(80,10,10,0.1),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(60,5,5,0.12),transparent_45%)]" />
      </div>

      {/* Light mode: subtle warm tint */}
      <div className="absolute inset-0 dark:hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(200,180,180,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(200,180,180,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(180,160,170,0.08),transparent_40%)]" />
      </div>

      {/* Main SVG canvas */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 2560"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <defs>
          {/* Grunge / splatter texture filter */}
          <filter id="grunge" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" seed="2" />
            <feDisplacementMap in="SourceGraphic" scale="6" />
          </filter>
          <filter id="grunge2" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="4" seed="7" />
            <feDisplacementMap in="SourceGraphic" scale="8" />
          </filter>
          <filter id="grunge3" x="-25%" y="-25%" width="150%" height="150%">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="2" seed="12" />
            <feDisplacementMap in="SourceGraphic" scale="5" />
          </filter>
          {/* Rough edge filter */}
          <filter id="rough">
            <feTurbulence type="turbulence" baseFrequency="0.03" numOctaves="5" seed="4" />
            <feDisplacementMap in="SourceGraphic" scale="3" />
          </filter>
        </defs>

        {/* ══════════════════════════════════════════
            GRUNGE SPLATTERS — multiple clusters
            ══════════════════════════════════════════ */}
        {/* Top-left splatter cluster (large) */}
        <g className="dark:opacity-50 opacity-35">
          <circle cx="80" cy="100" r="60" className="dark:fill-white/18 fill-black/14" filter="url(#grunge)" />
          <circle cx="140" cy="60" r="40" className="dark:fill-white/14 fill-black/16" filter="url(#grunge)" />
          <circle cx="50" cy="160" r="35" className="dark:fill-white/10 fill-black/9" filter="url(#grunge)" />
          <circle cx="180" cy="130" r="25" className="dark:fill-white/9 fill-black/7" filter="url(#grunge)" />
          <circle cx="30" cy="80" r="45" className="dark:fill-white/20 fill-black/9" filter="url(#grunge)" />
          <circle cx="200" cy="50" r="30" className="dark:fill-white/9 fill-black/6" filter="url(#grunge2)" />
          <circle cx="10" cy="200" r="20" className="dark:fill-white/10 fill-black/7" filter="url(#grunge)" />
        </g>

        {/* Top-right splatter */}
        <g className="dark:opacity-35 opacity-22">
          <circle cx="1380" cy="80" r="45" className="dark:fill-white/14 fill-black/9" filter="url(#grunge2)" />
          <circle cx="1420" cy="140" r="30" className="dark:fill-white/10 fill-black/7" filter="url(#grunge)" />
          <circle cx="1340" cy="50" r="25" className="dark:fill-white/9 fill-black/6" filter="url(#grunge3)" />
        </g>

        {/* Mid-left splatter */}
        <g className="dark:opacity-32 opacity-18">
          <circle cx="40" cy="900" r="35" className="dark:fill-white/10 fill-black/7" filter="url(#grunge2)" />
          <circle cx="80" cy="940" r="20" className="dark:fill-white/9 fill-black/6" filter="url(#grunge)" />
        </g>

        {/* Center splatter (subtle) */}
        <g className="dark:opacity-20 opacity-12">
          <circle cx="720" cy="1300" r="50" className="dark:fill-white/7 fill-black/6" filter="url(#grunge3)" />
        </g>

        {/* Bottom-left splatter */}
        <g className="dark:opacity-42 opacity-28">
          <circle cx="60" cy="1750" r="50" className="dark:fill-white/14 fill-black/16" filter="url(#grunge)" />
          <circle cx="120" cy="1790" r="30" className="dark:fill-white/10 fill-black/9" filter="url(#grunge)" />
          <circle cx="30" cy="1820" r="22" className="dark:fill-white/9 fill-black/6" filter="url(#grunge2)" />
        </g>

        {/* Bottom-right splatter */}
        <g className="dark:opacity-35 opacity-22">
          <circle cx="1350" cy="2400" r="55" className="dark:fill-white/14 fill-black/16" filter="url(#grunge)" />
          <circle cx="1390" cy="2350" r="35" className="dark:fill-white/10 fill-black/7" filter="url(#grunge)" />
          <circle cx="1300" cy="2430" r="28" className="dark:fill-white/9 fill-black/6" filter="url(#grunge3)" />
        </g>

        {/* Bottom-center splatter */}
        <g className="dark:opacity-28 opacity-16">
          <circle cx="700" cy="2480" r="40" className="dark:fill-white/9 fill-black/6" filter="url(#grunge2)" />
        </g>


        {/* ══════════════════════════════════════════
            WIREFRAME GLOBES
            ══════════════════════════════════════════ */}
        {/* Globe — Top-Right (large) */}
        <g transform="translate(1250, 100)" className="dark:opacity-35 opacity-22">
          <circle cx="100" cy="100" r="90" className="dark:stroke-white/30 stroke-black/20" strokeWidth="1" fill="none" />
          <ellipse cx="100" cy="100" rx="90" ry="35" className="dark:stroke-white/25 stroke-black/14" strokeWidth="0.8" fill="none" />
          <ellipse cx="100" cy="100" rx="35" ry="90" className="dark:stroke-white/25 stroke-black/14" strokeWidth="0.8" fill="none" />
          <ellipse cx="100" cy="100" rx="65" ry="90" className="dark:stroke-white/18 stroke-black/10" strokeWidth="0.6" fill="none" />
          <line x1="10" y1="100" x2="190" y2="100" className="dark:stroke-white/18 stroke-black/10" strokeWidth="0.5" />
          <line x1="100" y1="10" x2="100" y2="190" className="dark:stroke-white/18 stroke-black/10" strokeWidth="0.5" />
          <ellipse cx="100" cy="60" rx="80" ry="15" className="dark:stroke-white/14 stroke-black/9" strokeWidth="0.5" fill="none" />
          <ellipse cx="100" cy="140" rx="80" ry="15" className="dark:stroke-white/14 stroke-black/9" strokeWidth="0.5" fill="none" />
        </g>

        {/* Globe — Bottom-Left (medium) */}
        <g transform="translate(30, 1600)" className="dark:opacity-28 opacity-18">
          <circle cx="60" cy="60" r="55" className="dark:stroke-white/25 stroke-black/16" strokeWidth="0.8" fill="none" />
          <ellipse cx="60" cy="60" rx="55" ry="22" className="dark:stroke-white/18 stroke-black/10" strokeWidth="0.6" fill="none" />
          <ellipse cx="60" cy="60" rx="22" ry="55" className="dark:stroke-white/18 stroke-black/10" strokeWidth="0.6" fill="none" />
          <ellipse cx="60" cy="60" rx="40" ry="55" className="dark:stroke-white/14 stroke-black/9" strokeWidth="0.4" fill="none" />
          <line x1="5" y1="60" x2="115" y2="60" className="dark:stroke-white/14 stroke-black/9" strokeWidth="0.4" />
        </g>

        {/* Globe — Mid-Right (small) */}
        <g transform="translate(1300, 850)" className="dark:opacity-22 opacity-14">
          <circle cx="40" cy="40" r="35" className="dark:stroke-white/20 stroke-black/14" strokeWidth="0.6" fill="none" />
          <ellipse cx="40" cy="40" rx="35" ry="14" className="dark:stroke-white/14 stroke-black/9" strokeWidth="0.5" fill="none" />
          <ellipse cx="40" cy="40" rx="14" ry="35" className="dark:stroke-white/14 stroke-black/9" strokeWidth="0.5" fill="none" />
        </g>

        {/* Globe — Top-Left (small, partial) */}
        <g transform="translate(-20, 420)" className="dark:opacity-20 opacity-12">
          <circle cx="50" cy="50" r="45" className="dark:stroke-white/20 stroke-black/12" strokeWidth="0.6" fill="none" />
          <ellipse cx="50" cy="50" rx="45" ry="18" className="dark:stroke-white/14 stroke-black/9" strokeWidth="0.4" fill="none" />
          <ellipse cx="50" cy="50" rx="18" ry="45" className="dark:stroke-white/14 stroke-black/9" strokeWidth="0.4" fill="none" />
        </g>


        {/* ══════════════════════════════════════════
            TYPOGRAPHY — Brand copy & scattered text
            ══════════════════════════════════════════ */}
        {/* "DIFFERENT" brush text — Top-Right */}
        <text
          x="1180" y="310"
          className="dark:fill-white/20 fill-black/14"
          fontSize="72" fontFamily="'Outfit', sans-serif" fontWeight="900" fontStyle="italic"
          transform="rotate(-5, 1180, 310)"
        >Different</text>

        {/* "Crafted with purpose. Worn with pride." — Top-Left */}
        <g transform="translate(130, 200)" className="dark:opacity-50 opacity-35">
          <text y="0" className="dark:fill-white/70 fill-black/35" fontSize="16" fontFamily="'Outfit', sans-serif" fontWeight="400" fontStyle="italic">Crafted</text>
          <text y="22" className="dark:fill-white/70 fill-black/35" fontSize="16" fontFamily="'Outfit', sans-serif" fontWeight="400" fontStyle="italic">with purpose.</text>
          <text y="44" className="dark:fill-white/70 fill-black/35" fontSize="16" fontFamily="'Outfit', sans-serif" fontWeight="400" fontStyle="italic">Worn with</text>
          <text y="66" className="dark:fill-white/70 fill-black/35" fontSize="16" fontFamily="'Outfit', sans-serif" fontWeight="400" fontStyle="italic">pride.</text>
        </g>

        {/* Small block text — Right side */}
        <g transform="translate(1150, 430)" className="dark:opacity-35 opacity-22">
          <text y="0" className="dark:fill-white/38 fill-black/22" fontSize="9" fontFamily="monospace" letterSpacing="1">OUR STORY</text>
          <text y="14" className="dark:fill-white/38 fill-black/22" fontSize="9" fontFamily="monospace" letterSpacing="1">ISN&apos;T JUST</text>
          <text y="28" className="dark:fill-white/38 fill-black/22" fontSize="9" fontFamily="monospace" letterSpacing="1">WRITTEN.</text>
          <text y="42" className="dark:fill-white/38 fill-black/22" fontSize="9" fontFamily="monospace" letterSpacing="1">IT&apos;S WORN.</text>
          <text y="56" className="dark:fill-white/38 fill-black/22" fontSize="9" fontFamily="monospace" letterSpacing="1">IT&apos;S LIVED.</text>
          <text y="70" className="dark:fill-white/38 fill-black/22" fontSize="9" fontFamily="monospace" letterSpacing="1">IT&apos;S REAL.</text>
        </g>

        {/* "From dreams to designs." */}
        <g transform="translate(980, 1650)" className="dark:opacity-42 opacity-28">
          <text y="0" className="dark:fill-white/45 fill-black/26" fontSize="18" fontFamily="'Outfit', sans-serif" fontWeight="400" fontStyle="italic">From</text>
          <text y="24" className="dark:fill-white/45 fill-black/26" fontSize="18" fontFamily="'Outfit', sans-serif" fontWeight="400" fontStyle="italic">dreams</text>
          <text y="48" className="dark:fill-white/45 fill-black/26" fontSize="18" fontFamily="'Outfit', sans-serif" fontWeight="400" fontStyle="italic">to</text>
          <text y="72" className="dark:fill-white/50 fill-black/28" fontSize="18" fontFamily="'Outfit', sans-serif" fontWeight="400" fontStyle="italic" textDecoration="underline">designs.</text>
        </g>

        {/* "BUILT DIFFERENT" — Bottom-right */}
        <g transform="translate(1050, 2250)" className="dark:opacity-42 opacity-28">
          <text y="0" className="dark:fill-white/32 fill-black/18" fontSize="80" fontFamily="'Outfit', sans-serif" fontWeight="900" fontStyle="italic">Built</text>
          <text y="75" className="dark:fill-white/32 fill-black/18" fontSize="80" fontFamily="'Outfit', sans-serif" fontWeight="900" fontStyle="italic">Different</text>
        </g>

        {/* "HATS OFF" vertical text — Left side */}
        <g transform="translate(40, 1400) rotate(-90)" className="dark:opacity-35 opacity-22">
          <text className="dark:fill-white/32 fill-black/18" fontSize="14" fontFamily="'Outfit', sans-serif" fontWeight="800" letterSpacing="4">HATS OFF</text>
        </g>

        {/* "NO LIMITS" — faded large text, center */}
        <text
          x="200" y="1050"
          className="dark:fill-white/[0.10] fill-black/[0.05]"
          fontSize="180" fontFamily="'Outfit', sans-serif" fontWeight="900" letterSpacing="-5"
        >NO LIMITS</text>

        {/* "WEAR YOUR STORY" — faded watermark */}
        <text
          x="100" y="2100"
          className="dark:fill-white/[0.10] fill-black/[0.045]"
          fontSize="120" fontFamily="'Outfit', sans-serif" fontWeight="900" letterSpacing="-3"
          transform="rotate(-8, 100, 2100)"
        >WEAR YOUR STORY</text>

        {/* "EST. 2024" small stamp text */}
        <g transform="translate(1250, 2050)" className="dark:opacity-35 opacity-22">
          <text className="dark:fill-white/38 fill-black/22" fontSize="11" fontFamily="monospace" letterSpacing="3">EST. 2024</text>
        </g>

        {/* "MADE TO STAND OUT" — mid-left */}
        <g transform="translate(50, 1100)" className="dark:opacity-28 opacity-18">
          <text className="dark:fill-white/32 fill-black/18" fontSize="10" fontFamily="monospace" letterSpacing="2" transform="rotate(-90, 0, 0)">MADE TO STAND OUT</text>
        </g>

        {/* "ORIGINAL" scattered */}
        <text
          x="400" y="680"
          className="dark:fill-white/[0.10] fill-black/[0.07]"
          fontSize="28" fontFamily="'Outfit', sans-serif" fontWeight="700" letterSpacing="8"
        >ORIGINAL</text>

        {/* "STREETWEAR" large faded */}
        <text
          x="600" y="1800"
          className="dark:fill-white/[0.05] fill-black/[0.04]"
          fontSize="140" fontFamily="'Outfit', sans-serif" fontWeight="900"
          transform="rotate(90, 600, 1800)"
        >STREETWEAR</text>

        {/* Coordinates text */}
        <g transform="translate(1050, 600)" className="dark:opacity-28 opacity-18">
          <text className="dark:fill-white/32 fill-black/18" fontSize="8" fontFamily="monospace" letterSpacing="1">6.5244° N, 3.3792° E</text>
          <text y="12" className="dark:fill-white/25 fill-black/16" fontSize="7" fontFamily="monospace" letterSpacing="1">LAGOS, NIGERIA</text>
        </g>

        {/* "SINCE DAY 1" */}
        <g transform="translate(300, 2350)" className="dark:opacity-32 opacity-18">
          <text className="dark:fill-white/32 fill-black/18" fontSize="14" fontFamily="'Outfit', sans-serif" fontWeight="700" fontStyle="italic">Since day 1.</text>
        </g>


        {/* ══════════════════════════════════════════
            LIGHTNING BOLT
            ══════════════════════════════════════════ */}
        <g transform="translate(80, 380)" className="dark:opacity-55 opacity-35">
          <path d="M20 0 L5 30 L18 30 L0 60 L35 22 L20 22 L38 0 Z" className="dark:fill-red-600/80 fill-red-400/45" />
        </g>

        {/* Second smaller bolt — bottom area */}
        <g transform="translate(1100, 1950) scale(0.6)" className="dark:opacity-35 opacity-22">
          <path d="M20 0 L5 30 L18 30 L0 60 L35 22 L20 22 L38 0 Z" className="dark:fill-red-600/60 fill-red-400/35" />
        </g>


        {/* ══════════════════════════════════════════
            WINDING DASHED PATHS
            ══════════════════════════════════════════ */}
        {/* Primary S-curve through center */}
        <path
          d="M600 350 C700 500, 900 550, 850 750 S650 950, 750 1150 S950 1350, 800 1550 S600 1750, 700 1950"
          className="dark:stroke-white/18 stroke-black/14"
          strokeWidth="1.5" strokeDasharray="8 6" fill="none"
        />

        {/* Secondary winding path — left side */}
        <path
          d="M200 600 C250 750, 150 900, 200 1050 S300 1200, 180 1350 S100 1500, 220 1650"
          className="dark:stroke-white/10 stroke-black/4"
          strokeWidth="1" strokeDasharray="6 8" fill="none"
        />

        {/* Third path — right side, shorter */}
        <path
          d="M1200 1100 C1250 1250, 1150 1350, 1200 1500 S1300 1650, 1180 1800"
          className="dark:stroke-white/10 stroke-black/4"
          strokeWidth="1" strokeDasharray="5 7" fill="none"
        />

        {/* Connecting horizontal dashed line */}
        <line x1="400" y1="800" x2="850" y2="780" className="dark:stroke-white/5 stroke-black/3" strokeWidth="0.8" strokeDasharray="4 6" />


        {/* ══════════════════════════════════════════
            LOCATION PINS
            ══════════════════════════════════════════ */}
        {[
          [780, 560], [810, 870], [720, 1200], [770, 1550],
          [200, 850], [190, 1200], [1200, 1350], [1180, 1650],
        ].map(([x, y], i) => (
          <g key={`pin-${i}`} transform={`translate(${x - 10}, ${y - 25})`} className="dark:opacity-42 opacity-30">
            <path
              d="M10 0 C4.5 0, 0 4.5, 0 10 C0 17.5, 10 25, 10 25 S20 17.5, 20 10 C20 4.5, 15.5 0, 10 0Z"
              className="dark:fill-white/32 fill-black/18"
            />
            <circle cx="10" cy="10" r="4" className="dark:fill-white/18 fill-black/16" />
          </g>
        ))}


        {/* ══════════════════════════════════════════
            X MARKS
            ══════════════════════════════════════════ */}
        {/* Large X — right side */}
        <g transform="translate(1280, 1100)" className="dark:opacity-35 opacity-22">
          <line x1="0" y1="0" x2="100" y2="100" className="dark:stroke-white/30 stroke-black/20" strokeWidth="12" strokeLinecap="round" />
          <line x1="100" y1="0" x2="0" y2="100" className="dark:stroke-white/30 stroke-black/20" strokeWidth="12" strokeLinecap="round" />
        </g>

        {/* Medium X — top area */}
        <g transform="translate(350, 150)" className="dark:opacity-22 opacity-14">
          <line x1="0" y1="0" x2="50" y2="50" className="dark:stroke-white/25 stroke-black/14" strokeWidth="6" strokeLinecap="round" />
          <line x1="50" y1="0" x2="0" y2="50" className="dark:stroke-white/25 stroke-black/14" strokeWidth="6" strokeLinecap="round" />
        </g>

        {/* Small X marks scattered */}
        {[
          [1360, 280, 15], [1100, 650, 10], [300, 1900, 12],
          [100, 2400, 10], [900, 2300, 8], [500, 500, 10],
        ].map(([x, y, s], i) => (
          <g key={`x-${i}`} transform={`translate(${x}, ${y})`} className="dark:opacity-35 opacity-22">
            <line x1="0" y1="0" x2={s} y2={s} className="dark:stroke-white/25 stroke-black/15" strokeWidth="2" strokeLinecap="round" />
            <line x1={s} y1="0" x2="0" y2={s} className="dark:stroke-white/25 stroke-black/15" strokeWidth="2" strokeLinecap="round" />
          </g>
        ))}


        {/* ══════════════════════════════════════════
            STAR / SPARKLE SHAPES
            ══════════════════════════════════════════ */}
        {[
          [200, 340, 12], [1350, 700, 14], [650, 1900, 10], [350, 2100, 8],
          [900, 400, 10], [1100, 1500, 12], [450, 1400, 8], [150, 700, 10],
        ].map(([x, y, s], i) => (
          <g key={`star-${i}`} transform={`translate(${x}, ${y})`} className="dark:opacity-42 opacity-28">
            <path
              d={`M0 -${s} L${s * 0.25} -${s * 0.25} L${s} 0 L${s * 0.25} ${s * 0.25} L0 ${s} L-${s * 0.25} ${s * 0.25} L-${s} 0 L-${s * 0.25} -${s * 0.25} Z`}
              className="dark:fill-white/38 fill-black/22"
            />
          </g>
        ))}


        {/* ══════════════════════════════════════════
            PENTAGRAM STAR
            ══════════════════════════════════════════ */}
        <g transform="translate(1120, 1750)" className="dark:opacity-42 opacity-28">
          <polygon
            points="40,0 49,30 80,30 55,48 64,78 40,60 16,78 25,48 0,30 31,30"
            className="dark:stroke-red-600/60 stroke-red-400/40" strokeWidth="1.5" fill="none"
          />
        </g>

        {/* Second pentagram — top-left area */}
        <g transform="translate(280, 520) scale(0.6)" className="dark:opacity-28 opacity-16">
          <polygon
            points="40,0 49,30 80,30 55,48 64,78 40,60 16,78 25,48 0,30 31,30"
            className="dark:stroke-white/30 stroke-black/20" strokeWidth="1.5" fill="none"
          />
        </g>


        {/* ══════════════════════════════════════════
            CROSSHAIRS / TARGET
            ══════════════════════════════════════════ */}
        {/* Crosshair — center-left */}
        <g transform="translate(350, 1200)" className="dark:opacity-28 opacity-18">
          <circle cx="0" cy="0" r="20" className="dark:stroke-white/25 stroke-black/16" strokeWidth="0.8" fill="none" />
          <circle cx="0" cy="0" r="8" className="dark:stroke-white/18 stroke-black/12" strokeWidth="0.6" fill="none" />
          <circle cx="0" cy="0" r="2" className="dark:fill-white/25 fill-black/16" />
          <line x1="-28" y1="0" x2="-12" y2="0" className="dark:stroke-white/20 stroke-black/14" strokeWidth="0.6" />
          <line x1="12" y1="0" x2="28" y2="0" className="dark:stroke-white/20 stroke-black/14" strokeWidth="0.6" />
          <line x1="0" y1="-28" x2="0" y2="-12" className="dark:stroke-white/20 stroke-black/14" strokeWidth="0.6" />
          <line x1="0" y1="12" x2="0" y2="28" className="dark:stroke-white/20 stroke-black/14" strokeWidth="0.6" />
        </g>

        {/* Crosshair — bottom-right */}
        <g transform="translate(1100, 2100)" className="dark:opacity-22 opacity-14">
          <circle cx="0" cy="0" r="15" className="dark:stroke-white/20 stroke-black/14" strokeWidth="0.6" fill="none" />
          <circle cx="0" cy="0" r="5" className="dark:stroke-white/14 stroke-black/9" strokeWidth="0.5" fill="none" />
          <line x1="-22" y1="0" x2="-8" y2="0" className="dark:stroke-white/18 stroke-black/10" strokeWidth="0.5" />
          <line x1="8" y1="0" x2="22" y2="0" className="dark:stroke-white/18 stroke-black/10" strokeWidth="0.5" />
          <line x1="0" y1="-22" x2="0" y2="-8" className="dark:stroke-white/18 stroke-black/10" strokeWidth="0.5" />
          <line x1="0" y1="8" x2="0" y2="22" className="dark:stroke-white/18 stroke-black/10" strokeWidth="0.5" />
        </g>


        {/* ══════════════════════════════════════════
            ARROWS
            ══════════════════════════════════════════ */}
        {/* Arrow pointing right — mid section */}
        <g transform="translate(600, 950)" className="dark:opacity-32 opacity-18">
          <line x1="0" y1="0" x2="60" y2="0" className="dark:stroke-white/30 stroke-black/20" strokeWidth="1.5" />
          <path d="M55 -5 L65 0 L55 5" className="dark:stroke-white/30 stroke-black/20" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Arrow pointing down — right side */}
        <g transform="translate(1350, 500)" className="dark:opacity-28 opacity-16">
          <line x1="0" y1="0" x2="0" y2="50" className="dark:stroke-white/25 stroke-black/16" strokeWidth="1" />
          <path d="M-4 45 L0 52 L4 45" className="dark:stroke-white/25 stroke-black/16" strokeWidth="1" fill="none" strokeLinecap="round" />
        </g>

        {/* Curved arrow — top area */}
        <g transform="translate(500, 300)" className="dark:opacity-22 opacity-14">
          <path d="M0 30 Q30 0, 60 15" className="dark:stroke-white/25 stroke-black/16" strokeWidth="1" fill="none" />
          <path d="M55 8 L62 15 L55 22" className="dark:stroke-white/25 stroke-black/16" strokeWidth="1" fill="none" strokeLinecap="round" />
        </g>


        {/* ══════════════════════════════════════════
            BARCODE ELEMENT
            ══════════════════════════════════════════ */}
        <g transform="translate(1280, 1850)" className="dark:opacity-32 opacity-18">
          {[0, 4, 6, 10, 12, 14, 20, 22, 28, 30, 32, 36, 38, 42, 44, 48, 50, 54, 58, 60].map((x, i) => (
            <line
              key={`bar-${i}`}
              x1={x} y1="0" x2={x} y2={i % 3 === 0 ? 45 : 35}
              className="dark:stroke-white/30 stroke-black/20"
              strokeWidth={i % 4 === 0 ? 2 : 1}
            />
          ))}
          <text x="5" y="58" className="dark:fill-white/25 fill-black/16" fontSize="7" fontFamily="monospace">H4T5 0FF</text>
        </g>

        {/* Second barcode — left side */}
        <g transform="translate(80, 2200) rotate(-90, 30, 25)" className="dark:opacity-22 opacity-14">
          {[0, 3, 5, 8, 10, 14, 16, 20, 22, 24, 28, 30, 34, 36, 40].map((x, i) => (
            <line
              key={`bar2-${i}`}
              x1={x} y1="0" x2={x} y2={i % 2 === 0 ? 35 : 28}
              className="dark:stroke-white/25 stroke-black/16"
              strokeWidth={i % 3 === 0 ? 1.5 : 0.8}
            />
          ))}
        </g>


        {/* ══════════════════════════════════════════
            CIRCULAR STAMP
            ══════════════════════════════════════════ */}
        {/* HATS OFF stamp badge — Left side */}
        <g transform="translate(25, 1380)" className="dark:opacity-42 opacity-28">
          <circle cx="15" cy="15" r="14" className="dark:stroke-red-600/50 stroke-red-400/35" strokeWidth="1.5" fill="none" />
          <circle cx="15" cy="15" r="4" className="dark:fill-red-600/40 fill-red-400/25" />
        </g>

        {/* Larger stamp — center-right */}
        <g transform="translate(1050, 1400)" className="dark:opacity-22 opacity-14">
          <circle cx="35" cy="35" r="33" className="dark:stroke-white/25 stroke-black/16" strokeWidth="1" fill="none" />
          <circle cx="35" cy="35" r="28" className="dark:stroke-white/18 stroke-black/12" strokeWidth="0.6" fill="none" />
          <text x="35" y="33" textAnchor="middle" className="dark:fill-white/25 fill-black/16" fontSize="6" fontFamily="monospace" letterSpacing="2">HATS OFF</text>
          <text x="35" y="42" textAnchor="middle" className="dark:fill-white/20 fill-black/14" fontSize="5" fontFamily="monospace" letterSpacing="1">AUTHENTIC</text>
        </g>

        {/* Quality stamp — bottom */}
        <g transform="translate(500, 2400)" className="dark:opacity-28 opacity-16">
          <rect x="0" y="0" width="80" height="30" rx="3" className="dark:stroke-white/25 stroke-black/16" strokeWidth="1" fill="none" />
          <text x="40" y="13" textAnchor="middle" className="dark:fill-white/25 fill-black/16" fontSize="6" fontFamily="monospace" fontWeight="700" letterSpacing="3">QUALITY</text>
          <text x="40" y="23" textAnchor="middle" className="dark:fill-white/20 fill-black/14" fontSize="5" fontFamily="monospace" letterSpacing="2">APPROVED</text>
        </g>


        {/* ══════════════════════════════════════════
            DOT GRID PATTERNS
            ══════════════════════════════════════════ */}
        {/* Center-right grid */}
        <g className="dark:opacity-20 opacity-12">
          {Array.from({ length: 12 }, (_, row) =>
            Array.from({ length: 8 }, (_, col) => (
              <circle key={`dot-${row}-${col}`} cx={950 + col * 18} cy={900 + row * 18} r="1.5" className="dark:fill-white/32 fill-black/18" />
            ))
          )}
        </g>

        {/* Bottom-left grid */}
        <g className="dark:opacity-16 opacity-10">
          {Array.from({ length: 8 }, (_, row) =>
            Array.from({ length: 6 }, (_, col) => (
              <circle key={`dot2-${row}-${col}`} cx={100 + col * 18} cy={2050 + row * 18} r="1.5" className="dark:fill-white/25 fill-black/16" />
            ))
          )}
        </g>

        {/* Top-center grid */}
        <g className="dark:opacity-12 opacity-8">
          {Array.from({ length: 6 }, (_, row) =>
            Array.from({ length: 10 }, (_, col) => (
              <circle key={`dot3-${row}-${col}`} cx={550 + col * 16} cy={150 + row * 16} r="1" className="dark:fill-white/25 fill-black/16" />
            ))
          )}
        </g>

        {/* Mid-left grid (larger spacing) */}
        <g className="dark:opacity-14 opacity-8">
          {Array.from({ length: 5 }, (_, row) =>
            Array.from({ length: 4 }, (_, col) => (
              <circle key={`dot4-${row}-${col}`} cx={180 + col * 22} cy={1500 + row * 22} r="1.8" className="dark:fill-white/20 fill-black/14" />
            ))
          )}
        </g>


        {/* ══════════════════════════════════════════
            HALFTONE / FADE DOT PATTERN
            ══════════════════════════════════════════ */}
        <g className="dark:opacity-20 opacity-12">
          {Array.from({ length: 8 }, (_, row) =>
            Array.from({ length: 8 }, (_, col) => {
              const distFromCenter = Math.sqrt(Math.pow(row - 4, 2) + Math.pow(col - 4, 2));
              const radius = Math.max(0.5, 3 - distFromCenter * 0.4);
              return (
                <circle
                  key={`ht-${row}-${col}`}
                  cx={1050 + col * 14}
                  cy={750 + row * 14}
                  r={radius}
                  className="dark:fill-white/25 fill-black/16"
                />
              );
            })
          )}
        </g>

        {/* Second halftone — bottom-left */}
        <g className="dark:opacity-16 opacity-10">
          {Array.from({ length: 6 }, (_, row) =>
            Array.from({ length: 6 }, (_, col) => {
              const radius = Math.max(0.5, 2.5 - (row + col) * 0.2);
              return (
                <circle
                  key={`ht2-${row}-${col}`}
                  cx={250 + col * 12}
                  cy={2250 + row * 12}
                  r={radius}
                  className="dark:fill-white/20 fill-black/14"
                />
              );
            })
          )}
        </g>


        {/* ══════════════════════════════════════════
            SCRIBBLES & HAND-DRAWN LINES
            ══════════════════════════════════════════ */}
        {/* Wavy scribble — Top-left */}
        <path d="M30 60 Q50 30, 70 55 T110 50 T150 60" className="dark:stroke-white/18 stroke-black/10" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* Zigzag scribble — center */}
        <path d="M500 1100 L520 1080 L540 1100 L560 1080 L580 1100 L600 1080" className="dark:stroke-white/10 stroke-black/4" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />

        {/* Spiral scribble — right */}
        <g transform="translate(1200, 1600)" className="dark:opacity-20 opacity-12">
          <path d="M15 0 A15 15 0 1 1 15 30 A10 10 0 1 1 15 10 A5 5 0 1 1 15 20" className="dark:stroke-white/25 stroke-black/16" strokeWidth="0.8" fill="none" />
        </g>

        {/* Loose circle sketch */}
        <g transform="translate(800, 600)" className="dark:opacity-16 opacity-10">
          <path d="M0 25 C5 0, 45 -5, 50 20 S50 55, 25 55 S-5 50, 0 25" className="dark:stroke-white/20 stroke-black/14" strokeWidth="1" fill="none" />
        </g>

        {/* Underline scribble */}
        <path d="M980 1730 Q1020 1735, 1060 1728 T1120 1732" className="dark:stroke-white/25 stroke-black/16" strokeWidth="1" fill="none" strokeLinecap="round" />

        {/* Scratch marks — diagonal */}
        <g transform="translate(1350, 1050)" className="dark:opacity-28 opacity-16">
          <line x1="0" y1="0" x2="30" y2="30" className="dark:stroke-white/20 stroke-black/14" strokeWidth="0.8" />
          <line x1="8" y1="0" x2="38" y2="30" className="dark:stroke-white/18 stroke-black/10" strokeWidth="0.6" />
          <line x1="16" y1="0" x2="46" y2="30" className="dark:stroke-white/14 stroke-black/9" strokeWidth="0.5" />
        </g>

        {/* Scratchy texture lines — scattered */}
        <g className="dark:opacity-16 opacity-10">
          <line x1="300" y1="800" x2="340" y2="810" className="dark:stroke-white/18 stroke-black/10" strokeWidth="0.5" />
          <line x1="305" y1="806" x2="345" y2="816" className="dark:stroke-white/14 stroke-black/9" strokeWidth="0.4" />
          <line x1="700" y1="2200" x2="760" y2="2195" className="dark:stroke-white/18 stroke-black/10" strokeWidth="0.5" />
          <line x1="703" y1="2206" x2="763" y2="2201" className="dark:stroke-white/14 stroke-black/9" strokeWidth="0.4" />
        </g>


        {/* ══════════════════════════════════════════
            GEOMETRIC SHAPES — Triangles, Diamonds, Rings
            ══════════════════════════════════════════ */}
        {/* Triangle — top area */}
        <g transform="translate(850, 250)" className="dark:opacity-22 opacity-14">
          <polygon points="25,0 50,45 0,45" className="dark:stroke-white/25 stroke-black/16" strokeWidth="1" fill="none" />
        </g>

        {/* Inverted triangle */}
        <g transform="translate(400, 1600)" className="dark:opacity-20 opacity-12">
          <polygon points="0,0 50,0 25,40" className="dark:stroke-white/20 stroke-black/14" strokeWidth="0.8" fill="none" />
        </g>

        {/* Diamond */}
        <g transform="translate(1000, 1900)" className="dark:opacity-22 opacity-14">
          <polygon points="20,0 40,20 20,40 0,20" className="dark:stroke-white/25 stroke-black/16" strokeWidth="1" fill="none" />
        </g>

        {/* Concentric circles */}
        <g transform="translate(250, 1000)" className="dark:opacity-20 opacity-12">
          <circle cx="0" cy="0" r="25" className="dark:stroke-white/18 stroke-black/10" strokeWidth="0.6" fill="none" />
          <circle cx="0" cy="0" r="18" className="dark:stroke-white/14 stroke-black/9" strokeWidth="0.5" fill="none" />
          <circle cx="0" cy="0" r="11" className="dark:stroke-white/10 stroke-black/4" strokeWidth="0.4" fill="none" />
        </g>

        {/* Dashed circle */}
        <g transform="translate(900, 1600)" className="dark:opacity-20 opacity-12">
          <circle cx="0" cy="0" r="30" className="dark:stroke-white/18 stroke-black/10" strokeWidth="0.8" strokeDasharray="4 4" fill="none" />
        </g>

        {/* Hexagon */}
        <g transform="translate(650, 450)" className="dark:opacity-20 opacity-12">
          <polygon points="15,0 30,8 30,24 15,32 0,24 0,8" className="dark:stroke-white/20 stroke-black/14" strokeWidth="0.8" fill="none" />
        </g>

        {/* Stacked rectangles */}
        <g transform="translate(1150, 950)" className="dark:opacity-20 opacity-12">
          <rect x="0" y="0" width="40" height="25" className="dark:stroke-white/18 stroke-black/10" strokeWidth="0.6" fill="none" />
          <rect x="5" y="5" width="40" height="25" className="dark:stroke-white/14 stroke-black/9" strokeWidth="0.5" fill="none" />
        </g>


        {/* ══════════════════════════════════════════
            ACCENT BRUSH STROKES
            ══════════════════════════════════════════ */}
        {/* Bottom-right diagonal strokes */}
        <g transform="translate(1320, 2150)" className="dark:opacity-28 opacity-18">
          <line x1="0" y1="0" x2="60" y2="-25" className="dark:stroke-red-500/35 stroke-red-400/22" strokeWidth="3" strokeLinecap="round" />
          <line x1="5" y1="12" x2="55" y2="-10" className="dark:stroke-red-500/28 stroke-red-400/18" strokeWidth="2" strokeLinecap="round" />
          <line x1="10" y1="24" x2="50" y2="2" className="dark:stroke-red-500/20 stroke-red-400/15" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Top-left brush strokes */}
        <g transform="translate(220, 300)" className="dark:opacity-22 opacity-14">
          <line x1="0" y1="0" x2="40" y2="-15" className="dark:stroke-red-500/28 stroke-red-400/18" strokeWidth="2" strokeLinecap="round" />
          <line x1="3" y1="8" x2="38" y2="-5" className="dark:stroke-red-500/20 stroke-red-400/15" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* Mid-right accent strokes */}
        <g transform="translate(1380, 1300)" className="dark:opacity-22 opacity-14">
          <line x1="0" y1="0" x2="40" y2="20" className="dark:stroke-red-500/28 stroke-red-400/18" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="5" y1="-8" x2="45" y2="12" className="dark:stroke-red-500/20 stroke-red-400/15" strokeWidth="1.5" strokeLinecap="round" />
        </g>


        {/* ══════════════════════════════════════════
            PLUS SIGNS (+) — scattered
            ══════════════════════════════════════════ */}
        {[
          [200, 320], [1300, 680], [650, 1880], [900, 2000],
          [400, 900], [1200, 1250], [150, 1550], [800, 300],
          [550, 2400], [1050, 500], [700, 1050],
        ].map(([x, y], i) => (
          <g key={`plus-${i}`} transform={`translate(${x}, ${y})`} className="dark:opacity-35 opacity-22">
            <line x1="-5" y1="0" x2="5" y2="0" className="dark:stroke-red-500/60 stroke-red-400/40" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="0" y1="-5" x2="0" y2="5" className="dark:stroke-red-500/60 stroke-red-400/40" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        ))}


        {/* ══════════════════════════════════════════
            CORNER DECORATIONS
            ══════════════════════════════════════════ */}
        {/* Top-left corner lines */}
        <g className="dark:opacity-28 opacity-16">
          <line x1="0" y1="30" x2="30" y2="0" className="dark:stroke-white/25 stroke-black/16" strokeWidth="0.5" />
          <line x1="0" y1="50" x2="50" y2="0" className="dark:stroke-white/18 stroke-black/14" strokeWidth="0.5" />
        </g>

        {/* Top-right corner bracket */}
        <g transform="translate(1400, 20)" className="dark:opacity-22 opacity-14">
          <path d="M0 0 L0 30" className="dark:stroke-white/25 stroke-black/16" strokeWidth="0.8" />
          <path d="M0 0 L-30 0" className="dark:stroke-white/25 stroke-black/16" strokeWidth="0.8" />
        </g>

        {/* Bottom-left corner bracket */}
        <g transform="translate(20, 2530)" className="dark:opacity-22 opacity-14">
          <path d="M0 0 L0 -30" className="dark:stroke-white/25 stroke-black/16" strokeWidth="0.8" />
          <path d="M0 0 L30 0" className="dark:stroke-white/25 stroke-black/16" strokeWidth="0.8" />
        </g>

        {/* Bottom-right corner bracket */}
        <g transform="translate(1420, 2530)" className="dark:opacity-22 opacity-14">
          <path d="M0 0 L0 -30" className="dark:stroke-white/25 stroke-black/16" strokeWidth="0.8" />
          <path d="M0 0 L-30 0" className="dark:stroke-white/25 stroke-black/16" strokeWidth="0.8" />
        </g>


        {/* ══════════════════════════════════════════
            SMALL x x x PATTERNS
            ══════════════════════════════════════════ */}
        {/* Bottom-left row */}
        <g transform="translate(60, 2480)" className="dark:opacity-35 opacity-22">
          {[0, 25, 50, 75].map((offset, i) => (
            <g key={`xx-${i}`} transform={`translate(${offset}, 0)`}>
              <line x1="0" y1="0" x2="8" y2="8" className="dark:stroke-white/25 stroke-black/15" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="8" y1="0" x2="0" y2="8" className="dark:stroke-white/25 stroke-black/15" strokeWidth="1.5" strokeLinecap="round" />
            </g>
          ))}
        </g>

        {/* Top-right row */}
        <g transform="translate(1250, 2480)" className="dark:opacity-28 opacity-16">
          {[0, 20, 40].map((offset, i) => (
            <g key={`xx2-${i}`} transform={`translate(${offset}, 0)`}>
              <line x1="0" y1="0" x2="6" y2="6" className="dark:stroke-white/30 stroke-black/20" strokeWidth="1" strokeLinecap="round" />
              <line x1="6" y1="0" x2="0" y2="6" className="dark:stroke-white/30 stroke-black/20" strokeWidth="1" strokeLinecap="round" />
            </g>
          ))}
        </g>


        {/* ══════════════════════════════════════════
            STAR RATING DOTS
            ══════════════════════════════════════════ */}
        <g transform="translate(50, 2510)" className="dark:opacity-35 opacity-22">
          {[0, 14, 28, 42, 56].map((offset, i) => (
            <circle key={`rating-${i}`} cx={offset} cy="0" r="3" className="dark:fill-red-600/45 fill-red-400/35" />
          ))}
        </g>


        {/* ══════════════════════════════════════════
            SEMICIRCLE / ARC SHAPES
            ══════════════════════════════════════════ */}
        <g transform="translate(60, 500)" className="dark:opacity-20 opacity-12">
          <path d="M0 50 A50 50 0 0 1 100 50" className="dark:stroke-white/25 stroke-black/16" strokeWidth="0.8" fill="none" />
          <line x1="50" y1="0" x2="50" y2="50" className="dark:stroke-white/18 stroke-black/10" strokeWidth="0.5" strokeDasharray="4 3" />
        </g>

        {/* Arc — right mid */}
        <g transform="translate(1350, 1550)" className="dark:opacity-16 opacity-10">
          <path d="M0 0 A40 40 0 0 1 40 40" className="dark:stroke-white/20 stroke-black/14" strokeWidth="0.8" fill="none" />
        </g>

        {/* Arc — bottom */}
        <g transform="translate(500, 2300)" className="dark:opacity-16 opacity-10">
          <path d="M0 30 A30 30 0 0 0 60 30" className="dark:stroke-white/20 stroke-black/14" strokeWidth="0.6" fill="none" strokeDasharray="3 3" />
        </g>


        {/* ══════════════════════════════════════════
            HASH / LINE PATTERNS
            ══════════════════════════════════════════ */}
        {/* Diagonal hash pattern — mid-left */}
        <g transform="translate(100, 1050)" className="dark:opacity-16 opacity-10">
          {Array.from({ length: 6 }, (_, i) => (
            <line key={`hash-${i}`} x1={i * 8} y1="0" x2={i * 8 + 20} y2="20" className="dark:stroke-white/18 stroke-black/10" strokeWidth="0.5" />
          ))}
        </g>

        {/* Vertical line pattern — right */}
        <g transform="translate(1400, 700)" className="dark:opacity-16 opacity-10">
          {Array.from({ length: 5 }, (_, i) => (
            <line key={`vl-${i}`} x1={i * 5} y1="0" x2={i * 5} y2="40" className="dark:stroke-white/18 stroke-black/10" strokeWidth="0.4" />
          ))}
        </g>


        {/* ══════════════════════════════════════════
            SQUIGGLY UNDERLINES
            ══════════════════════════════════════════ */}
        {/* Under "Different" */}
        <path d="M1180 320 Q1210 330, 1240 318 T1300 322 T1370 318" className="dark:stroke-red-500/28 stroke-red-400/18" strokeWidth="1.5" fill="none" strokeLinecap="round" />

        {/* Random squiggle — mid area */}
        <path d="M400 1300 Q420 1290, 440 1300 T480 1298 T520 1302" className="dark:stroke-white/10 stroke-black/4" strokeWidth="0.8" fill="none" strokeLinecap="round" />

      </svg>

      {/* Subtle noise overlay for texture */}
      <div
        className="absolute inset-0 opacity-[0.08] dark:opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
        }}
      />
    </div>
  );
};

export default CreativeBackground;
