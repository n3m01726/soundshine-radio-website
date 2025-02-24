
import { useRef, useEffect } from 'react';

interface AudioSpectrumProps {
  audioRef: React.RefObject<HTMLAudioElement>;
}

const AudioSpectrum = ({ audioRef }: AudioSpectrumProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (!audioRef.current || !canvasRef.current) return;

    const setupAudioContext = async () => {
      // Create new context only if it doesn't exist
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        // Resume the audio context
        if (audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume();
          console.log('AudioContext resumed:', audioContextRef.current.state);
        }
      }

      // Disconnect previous analyzer if it exists
      if (analyzerRef.current) {
        analyzerRef.current.disconnect();
      }

      // Create analyzer node
      analyzerRef.current = audioContextRef.current.createAnalyser();
      analyzerRef.current.fftSize = 256;

      // Create source only if it doesn't exist
      if (!sourceRef.current && audioRef.current) {
        try {
          sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
        } catch (error) {
          console.warn('Audio source already exists, skipping creation.');
          return;
        }
      }

      // Reconnect all nodes in the correct order
      if (sourceRef.current && analyzerRef.current && audioContextRef.current) {
        // First disconnect source from any previous connections
        sourceRef.current.disconnect();
        
        // Then reconnect everything in order
        sourceRef.current.connect(analyzerRef.current);
        analyzerRef.current.connect(audioContextRef.current.destination);
        
        console.log('Audio nodes connected:', {
          sourceConnected: true,
          analyzerConnected: true,
          fftSize: analyzerRef.current.fftSize,
          frequencyBinCount: analyzerRef.current.frequencyBinCount,
          audioContextState: audioContextRef.current.state
        });
      }
    };

    setupAudioContext().catch(console.error);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    const bufferLength = analyzerRef.current!.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      if (!analyzerRef.current || !canvas) return;

      animationRef.current = requestAnimationFrame(draw);
      analyzerRef.current.getByteFrequencyData(dataArray);

      // Log some data to verify we're getting audio data
      if (dataArray.some(value => value > 0)) {
        console.log('Receiving audio data:', {
          max: Math.max(...Array.from(dataArray)),
          average: dataArray.reduce((a, b) => a + b, 0) / dataArray.length
        });
      }

      ctx.fillStyle = 'rgba(35, 14, 78, 0.8)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height;
        const alpha = (barHeight / canvas.height) * 0.8 + 0.2;

        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      // Ne pas déconnecter la source, car elle doit persister
      if (analyzerRef.current) {
        analyzerRef.current.disconnect();
      }
      // Ne pas fermer le contexte audio, il doit persister
    };
  }, [audioRef]);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-12 opacity-50"
      width={1024}
      height={48}
    />
  );
};

export default AudioSpectrum;
