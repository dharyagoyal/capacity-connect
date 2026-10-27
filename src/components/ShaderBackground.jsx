import React, { Component, Suspense, lazy } from "react";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";

/**
 * Single exported constant holding ShaderGradient configuration.
 * You can set control: 'query' and paste in urlString from shadergradient.co/customize
 * Or tweak props directly below.
 */
export const SHADER_GRADIENT_CONFIG = {
  // Switch to 'query' to use urlString from shadergradient.co/customize
  control: "props", // 'props' | 'query'
  urlString: "",    // e.g. "https://shadergradient.co/customize?..."
  
  // Default props: warm salmon/orange blended with soft blue-grey and lavender
  type: "plane",
  animate: "on",
  uSpeed: 0.2,
  grain: "on",
  lightType: "env",
  color1: "#f0a07a",
  color2: "#d9c3b8",
  color3: "#8fa6bf",
  brightness: 1.1,
  envPreset: "city",
  cDistance: 2.8,
  cPolarAngle: 80,
  cAzimuthAngle: 180,
  cameraZoom: 1,
  wireframe: false,
};

// Error Boundary to prevent crashes in headless or WebGL-unsupported environments
class CanvasErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.warn("ShaderGradient Canvas fallback activated due to WebGL context:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

export default function ShaderBackground({ config = SHADER_GRADIENT_CONFIG }) {
  const isQueryMode = config.control === "query" && Boolean(config.urlString);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Plain CSS gradient fallback behind canvas */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#1b1c2b] via-[#2a2438] to-[#121524]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 15% 20%, rgba(240, 160, 122, 0.35) 0%, transparent 45%),
            radial-gradient(circle at 85% 75%, rgba(143, 166, 191, 0.35) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(217, 195, 184, 0.2) 0%, transparent 60%),
            linear-gradient(135deg, #0f121d 0%, #1a1b2e 50%, #0d101a 100%)
          `,
        }}
      />

      {/* Subtle Grain Overlay for the CSS fallback */}
      <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* 3D WebGL Shader Canvas with Suspense and Error Boundary */}
      <CanvasErrorBoundary>
        <Suspense fallback={null}>
          <ShaderGradientCanvas
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
            lazy={true}
          >
            {isQueryMode ? (
              <ShaderGradient control="query" urlString={config.urlString} />
            ) : (
              <ShaderGradient
                control="props"
                type={config.type || "plane"}
                animate={config.animate || "on"}
                uSpeed={config.uSpeed ?? 0.2}
                grain={config.grain || "on"}
                lightType={config.lightType || "env"}
                color1={config.color1 || "#f0a07a"}
                color2={config.color2 || "#d9c3b8"}
                color3={config.color3 || "#8fa6bf"}
                brightness={config.brightness ?? 1.1}
                envPreset={config.envPreset || "city"}
                cDistance={config.cDistance ?? 2.8}
                cPolarAngle={config.cPolarAngle ?? 80}
                cAzimuthAngle={config.cAzimuthAngle ?? 180}
                cameraZoom={config.cameraZoom ?? 1}
                wireframe={Boolean(config.wireframe)}
              />
            )}
          </ShaderGradientCanvas>
        </Suspense>
      </CanvasErrorBoundary>
    </div>
  );
}
