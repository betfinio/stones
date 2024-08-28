import confetti from "canvas-confetti";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import arrowdown from "../../assets/Roulette/arrow-down.svg";
import cash from "../../assets/Roulette/cash.svg";
import neonImage from "../../assets/Roulette/neon-glow.png";
import ComplexRoulette from "./ComplexRoulette"; // Certifique-se de que o caminho esteja correto
// import crystal1 from "../../assets/Roulette/crystal1.svg";
// import crystal2 from "../../assets/Roulette/crystal2.svg";
// import crystal3 from "../../assets/Roulette/crystal3.svg";
// import crystal4 from "../../assets/Roulette/crystal4.svg";
// import crystal5 from "../../assets/Roulette/crystal5.svg";
import CrystalAnimation1 from "./Crystals/CrystalAnimation1";
import CrystalAnimation2 from "./Crystals/CrystalAnimation2";
import CrystalAnimation3 from "./Crystals/CrystalAnimation3";
import CrystalAnimation4 from "./Crystals/CrystalAnimation4";
import CrystalAnimation5 from "./Crystals/CrystalAnimation5";

const crystals = [
  { name: "Topaz", image: CrystalAnimation1, angle: 0 },
  { name: "Topaz", image: CrystalAnimation1, angle: 180 },
  { name: "Ruby", image: CrystalAnimation2, angle: 36 },
  { name: "Ruby", image: CrystalAnimation2, angle: 216 },
  { name: "Emerald", image: CrystalAnimation3, angle: 72 },
  { name: "Emerald", image: CrystalAnimation3, angle: 252 },
  { name: "Citrine", image: CrystalAnimation4, angle: 108 },
  { name: "Citrine", image: CrystalAnimation4, angle: 288 },
  { name: "Zircon", image: CrystalAnimation5, angle: 144 },
  { name: "Zircon", image: CrystalAnimation5, angle: 324 },
];

const baseSize = 1000; // Tamanho base para cálculo de escala
const initialRotation = 0; // Rotação inicial de 18 graus

const Wheel = () => {
  const controls = useAnimation();
  const arrowControls = useAnimation();
  const [isSpinning, setIsSpinning] = useState(false);
  const [showWinnerMessage, setShowWinnerMessage] = useState(false);
  const [showCountdown, setShowCountdown] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [currentRotation, setCurrentRotation] = useState(initialRotation);

  // Define breakpoints using react-responsive
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const isTablet = useMediaQuery({ minWidth: 750, maxWidth: 1023 });
  const isMobile = useMediaQuery({ maxWidth: 749 });

  const shootConfetti = () => {
    confetti({
      particleCount: 100,
      angle: -90,
      spread: 360,
      startVelocity: 30,
      origin: { x: 0.5, y: 0.1 },
      colors: ["#FF2A51", "#B100A8", "#FFB300", "#B0D100", "#2462E7"],
    });

    confetti({
      particleCount: 50,
      spread: 360,
      startVelocity: 40,
      gravity: 0,
      decay: 0.96,
      scalar: 2,
      shapes: ["circle"],
      colors: ["#FF2A51", "#B100A8", "#FFB300", "#B0D100", "#2462E7"],
      origin: { x: 0.5, y: 0.4 },
    });
  };

  const spinWheel = async (targetAngle: number) => {
    if (isSpinning) return;
    setIsSpinning(true);

    let rotationNeeded = targetAngle - (currentRotation % 360);
    if (rotationNeeded <= 0) {
      rotationNeeded += 360;
    }

    const extraSpins = 360 * 4; // Adiciona 4 voltas completas
    const finalRotation = currentRotation + extraSpins + rotationNeeded;

    // Iniciar a animação da seta com oscilações mais realistas
    arrowControls.start({
      rotate: [
        0, 10, 0, 15, 0, 20, 0, 30, 0, 40, 0, 45, 0, 45, 0, 45, 0, 45, 0, 45, 0,
        45, 0, 45, 0, 45, 0, 45, 0, 45, 0, 45, 0, 45, 0, 45, 0, 30, 0, 30, 0,
        20, 0, 10, 0, 10, 0, 5, 0, 5, 0, 0, 0, 0, 0, 0,
      ],
      transition: {
        duration: 3, // Oscilações iniciais rápidas
        ease: [0.33, 1, 0.68, 1],
      },
    });

    // Iniciar o giro da roleta
    await controls.start({
      rotate: finalRotation,
      transition: {
        duration: 3, // Aceleração e desaceleração suave
        ease: [0.33, 1, 0.68, 1], // Ease mais suave, simulando aceleração e desaceleração
      },
    });

    setShowCountdown(false);
    setShowWinnerMessage(true);
    shootConfetti();

    setTimeout(() => {
      setShowWinnerMessage(false);

      const remainder = finalRotation % 360;
      const nearestZeroAngle = finalRotation - remainder;

      controls
        .start({
          rotate: nearestZeroAngle + initialRotation, // Inclui a rotação inicial ao parar
          transition: {
            duration: 1,
            ease: "easeOut", // Suave ao parar
          },
        })
        .then(() => {
          setCurrentRotation(initialRotation); // Reseta a rotação para a inicial
          controls.set({ rotate: initialRotation }); // Garante que a roleta volte à posição inicial
          setIsSpinning(false);
          setShowCountdown(true);

          // Terminar a animação da seta
          arrowControls.start({
            rotate: 0, // Volta ao ponto neutro
            transition: { duration: 0.3, ease: "easeOut" },
          });
        });
    }, 2200);
  };

  const handleDebugClick = (angle: number) => {
    spinWheel(angle);
  };

  useEffect(() => {
    const updateContainerSize = () => {
      const container = containerRef.current;
      if (container) {
        const parentWidth = container.offsetWidth;
        const newScale = parentWidth / baseSize;
        setScale(newScale);
      }
    };

    updateContainerSize();
    window.addEventListener("resize", updateContainerSize);

    return () => {
      window.removeEventListener("resize", updateContainerSize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto overflow-hidden"
      style={{
        width: "100%",
        height: `${500 * scale}px`,
        paddingTop: `${500 * scale}px`,
      }}
    >
      <div
        className={`absolute top-[-50%] mx-auto ${isSpinning ? "cursor-not-allowed" : ""}`}
        style={{
          width: "100%",
          aspectRatio: "1 / 1",
          position: "relative",
          zIndex: 3, // Garantir que a roleta SVG esteja na frente dos elementos de fundo
        }}
      >
        <motion.div
          key="wheel"
          className="relative mx-auto -top-[100%] cursor-pointer"
          style={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <motion.img
            src={neonImage}
            alt="Neon Glow"
            className="absolute top-0 w-full h-full opacity-100 scale-[1.03]"
            style={{
              objectFit: "contain",
              zIndex: -1, // Mantém o glow atrás da roleta
            }}
            initial={{ scale: 0, opacity: 0 }} // Início com a imagem bem pequena e invisível
            animate={{ scale: [0, 1.04, 1.03], opacity: [0, 1, 1] }} // Escala da imagem aumenta até o tamanho final
            transition={{
              duration: 1.5, // Tempo total da animação
              ease: "easeInOut", // Suavidade para a entrada e saída
              times: [0, 0.5, 1], // Define os momentos das transições
            }}
          />
          {/* Renderiza a roleta ComplexRoulette com controles de animação */}
          <motion.div animate={controls}>
            <ComplexRoulette />
          </motion.div>

          <motion.div
            className="absolute inset-0 flex justify-center items-center"
            animate={controls}
          >
            {crystals.map((crystal, index) => (
              <div
                key={index}
                className="absolute text-center"
                style={{
                  transform: `rotate(${crystal.angle}deg) translate(0, ${-310 * scale * 1.13}px) rotate(${crystal.angle}deg)`,
                }}
              >
                <div
                  style={{
                    transform: `rotate(${-crystal.angle}deg)`,
                  }}
                  className="relative flex flex-col items-center justify-center space-y-[16%]"
                >
                  <div className="text-xs text-white transform -scale-y-100 -scale-x-100 flex items-center space-x-[3%]">
                    {/* Brilho atrás do cristal */}
                    <motion.div
                      className="absolute rounded-full bg-[#7366FF] opacity-[0.85] blur-xl"
                      style={{
                        width: `${70 * scale}px`, // Escala o tamanho do brilho conforme a escala geral
                        height: `${70 * scale}px`, // Escala o tamanho do brilho conforme a escala geral
                        top: `${-46 * scale}px`, // Ajusta a posição vertical conforme a escala
                        left: `${22 * scale}px`, // Ajusta a posição horizontal conforme a escala
                        transform: "translate(-50%, -50%)",
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 1] }}
                      transition={{
                        duration: 3, // Tempo total da animação
                        ease: "easeInOut", // Suavidade para a entrada e saída
                        times: [0, 0.5, 1], // Define os momentos das transições
                      }}
                    />
                    <motion.img
                      src={cash}
                      alt={`cash-${crystal.name}`}
                      style={{ height: `${18 * scale}px` }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 1] }}
                      transition={{
                        duration: 3, // Tempo total da animação
                        ease: "easeInOut", // Suavidade para a entrada e saída
                        times: [0, 0.5, 1], // Define os momentos das transições
                      }}
                      className="z-20"
                    />
                    <motion.span
                      style={{
                        fontSize: `${(isMobile ? 26 : 18) * scale}px`,
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 1] }}
                      transition={{
                        duration: 3, // Tempo total da animação
                        ease: "easeInOut", // Suavidade para a entrada e saída
                        times: [0, 0.5, 1], // Define os momentos das transições
                      }}
                      className="z-20"
                    >
                      100
                    </motion.span>
                  </div>

                  <motion.div
                    style={{
                      height: `${85 * scale}px`, // Aumentei o tamanho das pedras
                      objectFit: "cover",
                      marginBottom: "1px",
                      transform: "scaleY(-1) scaleX(-1)",
                    }}
                  >
                    <crystal.image />
                  </motion.div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <AnimatePresence mode="sync">
          {showCountdown && (
            <>
              <motion.div
                key="countdown"
                className="absolute flex flex-col text-center w-full text-white"
                style={{
                  top: `-${420 * scale}px`,
                  fontSize: `${20 * scale}px`,
                  zIndex: 4,
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1.2 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, stiffness: 500 }}
              >
                <span
                  style={{
                    fontSize: `${14 * scale * 2}px`,
                    lineHeight: `${17 * scale * 2}px`,
                    opacity: 0.4,
                  }}
                >
                  Stop game in:
                </span>
                <span
                  className="font-medium"
                  style={{
                    fontSize: `${30 * scale * 1.4}px`,
                    lineHeight: `${36 * scale * 1.4}px`,
                  }}
                >
                  10
                </span>
              </motion.div>

              <motion.div
                key="arrow"
                className="absolute w-full flex justify-center items-center"
                style={{
                  top: `-${268 * scale}px`,
                  zIndex: 5,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <motion.img
                  src={arrowdown}
                  alt="arrow-down"
                  className="absolute"
                  style={{
                    width: `${25 * scale}px`,
                    height: `${25 * scale}px`,
                    transformOrigin: "top center",
                  }}
                  animate={arrowControls}
                />
              </motion.div>
            </>
          )}

          {showWinnerMessage && (
            <motion.div
              key="winnerMessage"
              className="absolute w-full flex flex-col items-center justify-center text-center text-white"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1.2 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, stiffness: 500 }}
              style={{
                top: `-${420 * scale}px`,
                fontSize: `${20 * scale}px`,
                zIndex: 5,
              }}
            >
              <div
                className="absolute rounded-full opacity-30 blur-2xl"
                style={{
                  width: `${300 * scale}px`,
                  height: `${300 * scale}px`,
                  background: "blue",
                }}
              />
              <h2
                className="font-bold"
                style={{
                  fontSize: `${24 * scale}px`,
                  zIndex: 6,
                }}
              >
                You win:
              </h2>
              <p
                className="font-bold"
                style={{
                  fontSize: `${40 * scale}px`,
                  color: "#FFD700",
                  zIndex: 6,
                }}
              >
                500
              </p>
              <p
                className="font-semibold"
                style={{
                  fontSize: `${20 * scale}px`,
                  color: "#00BFFF",
                  zIndex: 6,
                }}
              >
                Bonus
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute -top-1/2 right-4 w-fit text-xs z-7">
          <select
            onChange={(e) => handleDebugClick(Number.parseInt(e.target.value))}
            className="bg-white text-black p-2 rounded"
            disabled={isSpinning}
          >
            <option value="" disabled selected>
              Select Crystal
            </option>
            {crystals.map((crystal) => (
              <option key={crystal.name} value={crystal.angle}>
                {crystal.name} ({crystal.angle}°)
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Wheel;
