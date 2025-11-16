import { useEffect, useRef } from "react";

type WaveLayer = {
	amplitude: number;
	frequencyOffset: number;
	baseline: number;
	perspective: number;
	thickness: number;
	alpha: number;
	offset: number;
	spacing: number;
};

type PointerState = {
	x: number;
	y: number;
	strength: number;
	radius: number;
	targetRadius: number;
	active: boolean;
};

const BASE_FREQUENCY = 0.88;
const DEFAULT_POINTER_RADIUS = 0.15;

const WAVE_LAYERS: WaveLayer[] = Array.from({ length: 12 }, (_, index) => {
	const depth = index / 11;
	const frequencyOffset = (depth - 0.5) * 0.05;
	return {
		amplitude: 26 + (1 - depth) * 48,
		frequencyOffset,
		baseline: 0.97 - depth * 0.42,
		perspective: 0.05 + depth * 0.6,
		thickness: 1.1 + (1 - depth) * 2,
		alpha: 0.22 + (1 - depth) * 0.3,
		offset: depth * Math.PI * 0.65,
		spacing: 14 + depth * 12
	} satisfies WaveLayer;
});

export const AnimatedWaveBackground = () => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const animationRef = useRef<number | null>(null);
	const themeRef = useRef<boolean>(false);
	const pointerRef = useRef<PointerState>({
		x: 0.5,
		y: 0.5,
		strength: 0,
		radius: DEFAULT_POINTER_RADIUS,
		targetRadius: DEFAULT_POINTER_RADIUS,
		active: false
	});

	useEffect(() => {
		themeRef.current = document.documentElement.classList.contains("dark");

		const observer = new MutationObserver(() => {
			themeRef.current = document.documentElement.classList.contains("dark");
		});

		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"]
		});

		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		const updatePointer = (event: PointerEvent) => {
			const { innerWidth, innerHeight } = window;
			pointerRef.current.x = event.clientX / innerWidth;
			pointerRef.current.y = event.clientY / innerHeight;
			const verticalBias = 0.65 + Math.abs(pointerRef.current.y - 0.5) * 0.9;
			pointerRef.current.targetRadius = Math.max(0.08, Math.min(0.28, DEFAULT_POINTER_RADIUS * verticalBias));
			pointerRef.current.active = true;
		};

		const fadePointer = () => {
			pointerRef.current.active = false;
			pointerRef.current.targetRadius = DEFAULT_POINTER_RADIUS;
		};

		window.addEventListener("pointermove", updatePointer);
		window.addEventListener("pointerleave", fadePointer);

		return () => {
			window.removeEventListener("pointermove", updatePointer);
			window.removeEventListener("pointerleave", fadePointer);
		};
	}, []);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const context = canvas.getContext("2d");
		if (!context) return;

		const resize = () => {
			const { innerWidth, innerHeight, devicePixelRatio = 1 } = window;
			canvas.width = innerWidth * devicePixelRatio;
			canvas.height = innerHeight * devicePixelRatio;
			canvas.style.width = `${innerWidth}px`;
			canvas.style.height = `${innerHeight}px`;
			context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
		};

		resize();
		window.addEventListener("resize", resize);

		let previousTime = performance.now();

		const render = (time: number) => {
			const dt = Math.min(0.04, (time - previousTime) / 1000);
			previousTime = time;
			const pointer = pointerRef.current;
			const targetStrength = pointer.active ? 1 : 0;
			const lerpFactor = Math.min(1, dt * 4);
			pointer.strength += (targetStrength - pointer.strength) * lerpFactor;
			const radiusLerp = Math.min(1, dt * 6);
			pointer.radius += (pointer.targetRadius - pointer.radius) * radiusLerp;

			const width = canvas.width / (window.devicePixelRatio || 1);
			const height = canvas.height / (window.devicePixelRatio || 1);

			context.clearRect(0, 0, width, height);

			drawGradientBackdrop(context, width, height, themeRef.current);
			drawWaveLines(context, width, height, time * 0.001, pointerRef.current);

			animationRef.current = requestAnimationFrame(render);
		};

		animationRef.current = requestAnimationFrame(render);

		return () => {
			if (animationRef.current) cancelAnimationFrame(animationRef.current);
			window.removeEventListener("resize", resize);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			aria-hidden
			className="pointer-events-none fixed inset-0 -z-10 opacity-90"
		/>
	);
};

const drawGradientBackdrop = (
	ctx: CanvasRenderingContext2D,
	width: number,
	height: number,
	isDark: boolean
) => {
	const baseGradient = ctx.createLinearGradient(0, 0, 0, height);
	if (isDark) {
		baseGradient.addColorStop(0, "rgba(2, 6, 23, 0.85)");
		baseGradient.addColorStop(1, "rgba(2, 10, 25, 0.95)");
	} else {
		baseGradient.addColorStop(0, "rgba(241, 245, 255, 0.9)");
		baseGradient.addColorStop(1, "rgba(226, 232, 255, 0.95)");
	}

	ctx.fillStyle = baseGradient;
	ctx.fillRect(0, 0, width, height);
};

const drawWaveLines = (
	ctx: CanvasRenderingContext2D,
	width: number,
	height: number,
	elapsed: number,
	pointer: PointerState
) => {
	const gradient = ctx.createLinearGradient(0, height * 0.2, width, height * 0.8);
	gradient.addColorStop(0, "rgba(56, 189, 248, 0.95)");
	gradient.addColorStop(0.4, "rgba(129, 140, 248, 0.88)");
	gradient.addColorStop(1, "rgba(236, 72, 153, 0.85)");

	ctx.save();
	ctx.shadowColor = "rgba(59, 130, 246, 0.2)";
	ctx.shadowBlur = 25;
	ctx.globalCompositeOperation = "lighter";

	const masterPhase = elapsed * 0.35;
	const travel = elapsed * 0.08;
	const breathing = Math.sin(masterPhase) * 0.02;

	WAVE_LAYERS.forEach((wave, index) => {
		const depth = index / (WAVE_LAYERS.length - 1 || 1);
		const dashLength = Math.max(0.6, wave.thickness * 0.25);
		const dashGap = wave.spacing;

		ctx.globalAlpha = Math.min(1, wave.alpha + depth * 0.2);
		ctx.lineWidth = wave.thickness * (0.8 + depth * 0.4);
		ctx.strokeStyle = gradient;
		ctx.lineCap = "round";
		ctx.setLineDash([dashLength, dashGap]);

		ctx.beginPath();
		for (let x = 0; x <= width; x += 2) {
			const ratio = x / width;
			const eased = ratio ** 1.35;
			const slope = wave.baseline - eased * wave.perspective + breathing * (1 - depth * 0.7);
			const depthScale = 0.3 + ratio * 0.6;
			const advance =
				(ratio + travel) * Math.PI * 2 * (BASE_FREQUENCY + wave.frequencyOffset) + masterPhase + wave.offset;
			const sinus = Math.sin(advance);
			const perspectiveBend = eased * wave.perspective * height * (0.09 + depth * 0.05);
			const pointerX = pointer.x * width;
			const pointerY = pointer.y * height;
			const radiusX = Math.max(0.04, pointer.radius) * width;
			const radiusY = Math.max(radiusX * 0.85, 1);
			const yBase = height * slope;
			const pointerDx = x - pointerX;
			const pointerDy = yBase - pointerY;
			const falloff = Math.exp(-((pointerDx ** 2) / (radiusX ** 2) + (pointerDy ** 2) / (radiusY ** 2)));
			const pointerFalloff = Math.max(0, falloff);
			const sagFactor = pointer.strength * pointerFalloff;
			const damping = 1 - sagFactor * 0.65;
			const waveDisplacement = sinus * (wave.amplitude * depthScale * damping);
			const sagAmount = sagFactor * wave.amplitude * (0.4 + depth * 0.35);
			const y = yBase + waveDisplacement - perspectiveBend + sagAmount;
			if (x === 0) ctx.moveTo(x, y);
			else ctx.lineTo(x, y);
		}
		ctx.stroke();
		ctx.setLineDash([]);
	});

	ctx.restore();
};
