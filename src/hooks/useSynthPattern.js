import { Transport, start } from "tone";
import { useEffect, useState, useMemo } from "react";
import { createSampler } from "../util";

export default function useSynthPattern(UI) {
  const keys = UI.parts.map((part) => part.getKey());
  const playing = UI.parts.map((part) => part.playing);
  const volumes = UI.parts.map((part) => part.volume);
  const instruments = UI.parts.map((part) => part.instrument);

  const [samplers, setSamplers] = useState([]);
  const loaded = samplers.map((s) => s?.loaded);

  useEffect(() => {
    console.log("Creating samplers...");
    UI.stopParts();
    setSamplers(
      UI.parts.map((part) => {
        const sampler = createSampler(part.instrument);
        sampler.volume.value = part.volume;
        return sampler;
      })
    );
  }, [JSON.stringify(instruments)]);

  useEffect(() => {
    setSamplers((samplers) =>
      samplers.map((x, i) => {
        const s = x;
        s.volume.value = UI.parts[i].volume;
        return s;
      })
    );
  }, [JSON.stringify(volumes)]);

  useEffect(() => {
    Transport.start(0);
    start(0);

    if (!samplers.length) return;
    let patterns = [];
    for (let i = 0; i < UI.parts.length; i++) {
      if (!playing[i] || !loaded[i]) continue;
      const part = UI.parts[i];
      const pattern = part.createSamplerPattern(samplers[i]);
      if (!pattern) continue;
      patterns = [...patterns, pattern];
      console.log("Starting pattern...");
      pattern.start(0);
    }
    return () => {
      patterns.forEach((pattern) => pattern.dispose());
    };
  }, [JSON.stringify(keys), JSON.stringify(playing), JSON.stringify(loaded)]);
}
