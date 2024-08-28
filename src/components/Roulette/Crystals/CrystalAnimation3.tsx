import { motion } from 'framer-motion';

const CrystalAnimation3 = () => {
	const pathVariants = {
		hidden: { opacity: 0, pathLength: 0, scale: 0.8, x: '0%', y: '-50%' },
		visible: (i: number) => ({
			opacity: 1,
			pathLength: 1,
			scale: 1,
			x: 0,
			y: 0,
			transition: {
				delay: i * 0.02,
				duration: 0.5,
				ease: 'easeInOut',
			},
		}),
	};

	return (
		<motion.svg
			initial="hidden"
			animate="visible"
			width="52"
			height="60"
			viewBox="0 0 52 60"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className="w-full h-full"
		>
			<title className="hidden">Crystal Animation 3</title>
			<motion.g clipPath="url(#clip0_1_1645)">
				<motion.path
					variants={pathVariants}
					custom={0}
					d="M34.4634 31.4927L34.4542 31.8159L34.2353 39.2733L34.0863 44.3424V44.3435L33.997 47.4092L31.196 58.996L28.6448 56.9617L25.4931 54.4507L20.4218 50.4085L14.0932 45.3635L12.5185 44.1074L12.3959 39.781V39.7799L12.2377 34.2238L10.8 33.0001L16.8 26.7001H17.1L20.7 23.1001L28.8225 15.2667L30.3857 14.147L31.1536 15.3435L31.651 17.7708L32.0452 19.6916L32.6675 22.7299L33.2302 25.4758L33.9225 28.8521L34.4634 31.4927Z"
					fill="url(#paint0_linear_1_1645)"
				/>
				<motion.path
					variants={pathVariants}
					custom={1}
					d="M45.5837 0L43.7167 11.8583L42.5764 19.0958L42.0549 22.4033L41.7535 24.3172L39.2597 40.1513L34.4634 31.4928L31.1536 15.3435L32.6171 14.2181L32.8085 10.4831L33.4388 9.96619L34.6273 8.99089L36.9274 7.10332L40.0436 4.54644L45.5837 0Z"
					fill="url(#paint1_linear_1_1645)"
				/>
				<motion.path variants={pathVariants} custom={2} d="M45.5836 0L51.3037 43.5299L39.2596 40.1513L45.5836 0Z" fill="url(#paint2_linear_1_1645)" />
				<motion.path
					variants={pathVariants}
					custom={3}
					d="M51.3036 43.53L31.1959 58.9961L31.7277 56.7957L32.2973 54.4394L32.5735 53.2956L33.1133 51.0688V51.0676L33.9969 47.4094L37.1383 40.4058L39.2596 40.1514L43.0669 41.2195L45.0209 41.7673L48.8717 42.8481L51.3036 43.53Z"
					fill="url(#paint3_linear_1_1645)"
				/>
				<motion.path variants={pathVariants} custom={4} d="M31.196 58.996L12.5186 44.1074L14.4451 59.9999L31.196 58.996Z" fill="url(#paint4_linear_1_1645)" />
				<motion.path variants={pathVariants} custom={5} d="M0 39.2595L12.5185 44.1074L14.445 59.9999L0 39.2595Z" fill="url(#paint5_linear_1_1645)" />
				<motion.path
					variants={pathVariants}
					custom={6}
					d="M12.2377 34.2238L10.8 33L7.55487 33.9969L0 39.2597L12.5185 44.1075L12.2377 34.2238Z"
					fill="url(#paint6_linear_1_1645)"
				/>
				<motion.path
					variants={pathVariants}
					custom={7}
					d="M32.8084 10.4832L32.617 14.2182L31.1535 15.3436L30.3856 14.146L28.8224 15.2668L28.168 12.577L30.6011 10.9645L32.8084 10.4832Z"
					fill="url(#paint7_linear_1_1645)"
				/>
				<motion.path
					variants={pathVariants}
					custom={8}
					d="M11.0561 30.6652L9.97765 11.2073L0 39.2595L7.55487 33.9968L11.0561 30.6652Z"
					fill="url(#paint8_linear_1_1645)"
				/>
				<motion.path
					variants={pathVariants}
					custom={9}
					d="M45.5835 0L43.8323 1.43717L42.7057 2.3609L40.6405 4.05593L37.8052 6.38473L35.0798 8.61956L33.7813 9.6854L32.8083 10.4831L30.601 10.9644L28.1679 12.5769L9.97754 11.2074L19.2423 8.29179H19.2446L21.4508 7.59613L27.6877 5.63291H27.6888L32.8037 4.02269L40.589 1.5724L41.3156 1.34319L45.5835 0Z"
					fill="url(#paint9_linear_1_1645)"
				/>
				<motion.path
					variants={pathVariants}
					custom={10}
					d="M37.1383 40.4056L34.4634 31.4927L33.9969 47.4092L37.1383 40.4056Z"
					fill="url(#paint10_linear_1_1645)"
				/>
				<motion.path
					variants={pathVariants}
					custom={11}
					d="M39.2597 40.1512L34.4634 31.4927L37.1383 40.4056L39.2597 40.1512Z"
					fill="url(#paint11_linear_1_1645)"
				/>
				<motion.path variants={pathVariants} custom={12} d="M0 39.2595L7.55487 33.9968L10.8 33L9.97765 11.2073L0 39.2595Z" fill="url(#paint12_linear_1_1645)" />
				<motion.path
					className="opacity-25"
					variants={pathVariants}
					custom={13}
					opacity="0.15"
					d="M39.2597 40.1512L32.6171 14.218L41.2126 27.6304L39.2597 40.1512Z"
					fill="url(#paint13_linear_1_1645)"
				/>
				<motion.path variants={pathVariants} custom={14} d="M11.056 30.6652L9.98671 11.2039L9.97754 11.2073L11.056 30.6652Z" fill="#F8F8F8" />
				<motion.path
					variants={pathVariants}
					custom={15}
					d="M17.0304 11.7299L9.97754 11.2073L11.056 30.6652L17.0304 11.7299Z"
					fill="url(#paint14_linear_1_1645)"
				/>
				<motion.path
					variants={pathVariants}
					custom={16}
					d="M10.8 33.0003L28.8225 15.2668L28.1681 12.577L22.3438 12.1392L10.8 33.0003Z"
					fill="url(#paint15_linear_1_1645)"
				/>
				<motion.path
					variants={pathVariants}
					custom={17}
					d="M10.8 33L10.9759 35.2655L10.8074 36.6454L10.7123 37.4247L10.5094 39.0819L10.1232 42.252L0 39.2596L1.41081 38.2762L2.87319 37.2574L4.06739 36.4253H4.06853L5.32577 35.5498H5.32692L7.55487 33.9968L10.8 33Z"
					fill="url(#paint16_linear_1_1645)"
				/>
				<motion.path variants={pathVariants} custom={18} d="M12.5185 44.1074L10.2 41.3396L0 39.2595L12.5185 44.1074Z" fill="url(#paint17_linear_1_1645)" />
				<motion.path
					className="opacity-25"
					variants={pathVariants}
					custom={19}
					opacity="0.1"
					d="M42.0548 22.4034L41.7534 24.3173L33.4387 9.96627L34.6272 8.99097L42.0548 22.4034Z"
					fill="white"
				/>
				<motion.path
					className="opacity-25"
					variants={pathVariants}
					custom={20}
					opacity="0.1"
					d="M43.7167 11.8583L42.5763 19.0957L36.9274 7.10326L40.0435 4.54639L43.7167 11.8583Z"
					fill="white"
				/>
				<motion.path
					className="opacity-25"
					variants={pathVariants}
					custom={21}
					opacity="0.15"
					d="M35.0798 8.61963L33.7813 9.68547L19.2446 8.29185L21.4508 7.59619L35.0798 8.61963Z"
					fill="white"
				/>
				<motion.path
					className="opacity-25"
					variants={pathVariants}
					custom={22}
					opacity="0.15"
					d="M40.6407 4.05594L37.8053 6.38475L27.689 5.63293L32.8039 4.02271L40.6407 4.05594Z"
					fill="white"
				/>
				<motion.path
					className="opacity-25"
					variants={pathVariants}
					custom={23}
					opacity="0.15"
					d="M43.8325 1.43724L42.7059 2.36097L40.5891 1.57247L41.3157 1.34326L43.8325 1.43724Z"
					fill="white"
				/>
				<motion.path
					variants={pathVariants}
					custom={24}
					d="M33.9969 47.4094L34.6766 56.1803L40.6751 51.6533L39.2597 40.1514L37.6678 42.4011L33.9969 47.4094Z"
					fill="url(#paint18_linear_1_1645)"
				/>
				<motion.path
					variants={pathVariants}
					custom={25}
					d="M37.1383 40.4058L33.9969 47.4094L39.2597 40.1514L37.1383 40.4058Z"
					fill="url(#paint19_linear_1_1645)"
				/>
				<motion.path
					variants={pathVariants}
					custom={26}
					d="M34.2353 39.2734L34.0863 44.3425V44.3436L28.6436 56.9618L25.4919 54.4508C27.4861 51.3587 32.5838 42.2417 34.2353 39.2734Z"
					fill="url(#paint20_linear_1_1645)"
				/>
				<motion.path
					variants={pathVariants}
					custom={27}
					d="M34.4542 31.8159L31.1536 15.3435L32.6171 14.218L34.4542 31.8159Z"
					fill="url(#paint21_linear_1_1645)"
				/>
				<motion.path
					variants={pathVariants}
					custom={28}
					d="M32.6171 14.218L34.4542 31.8159L31.1536 15.3435L32.6171 14.218Z"
					fill="url(#paint22_linear_1_1645)"
				/>
				<motion.path
					variants={pathVariants}
					custom={29}
					opacity="0.5"
					d="M45.3716 41.9197L49.8298 32.311L51.3036 43.5299L45.3716 41.9197Z"
					fill="url(#paint23_linear_1_1645)"
				/>
				<motion.path
					variants={pathVariants}
					custom={30}
					d="M51.3037 43.5299L46.9566 23.6411L39.2596 40.1513L51.3037 43.5299Z"
					fill="url(#paint24_linear_1_1645)"
				/>
				<motion.path variants={pathVariants} custom={31} d="M45.5837 0L32.5013 10.6103L32.7879 10.7593L45.5837 0Z" fill="white" />
				<motion.path
					variants={pathVariants}
					custom={32}
					d="M51.3037 43.5298L45.202 15.4065L39.2596 40.1512L51.3037 43.5298Z"
					fill="url(#paint25_linear_1_1645)"
				/>
				<motion.path
					variants={pathVariants}
					custom={33}
					d="M28.8225 15.2668L12.2378 34.2239L12.5186 44.1076L31.196 58.9961L28.8225 15.2668Z"
					fill="url(#paint26_linear_1_1645)"
				/>
				<motion.path
					variants={pathVariants}
					custom={34}
					d="M32.8084 10.4832L32.617 14.2182L31.1535 15.3436L30.3856 14.146L32.8084 10.4832Z"
					fill="url(#paint27_linear_1_1645)"
				/>
				<motion.path
					variants={pathVariants}
					custom={35}
					d="M30.6011 10.9644L28.168 12.5769L28.8224 15.2667L30.3856 14.1458L30.6011 10.9644Z"
					fill="url(#paint28_linear_1_1645)"
				/>
				<motion.path
					variants={pathVariants}
					custom={36}
					d="M30.6011 10.9645L30.3856 14.146L32.8084 10.4832L30.6011 10.9645Z"
					fill="url(#paint29_linear_1_1645)"
				/>
				<motion.path
					variants={pathVariants}
					custom={37}
					d="M28.1635 12.6365L9.97314 11.2658L9.98117 11.1489L28.1727 12.5185L28.1635 12.6365Z"
					fill="url(#paint30_linear_1_1645)"
				/>
				<motion.path
					variants={pathVariants}
					custom={38}
					d="M13.0295 28.2242L17.4442 14.3878L24.9991 14.303L13.0295 28.2242Z"
					fill="url(#paint31_linear_1_1645)"
				/>
				<motion.path
					variants={pathVariants}
					custom={39}
					d="M11.5867 11.9695L22.1981 13.3276L12.5207 30.177L11.5867 11.9695Z"
					fill="url(#paint32_linear_1_1645)"
				/>
				<motion.path
					variants={pathVariants}
					custom={40}
					d="M27.2488 13.5396L12.5208 30.1771L20.118 12.3936L27.2488 13.5396Z"
					fill="url(#paint33_linear_1_1645)"
				/>
				<motion.path
					variants={pathVariants}
					custom={41}
					d="M10.2856 11.1428L28.476 12.5135L11.1126 32.877L10.2856 11.1428Z"
					fill="url(#paint34_linear_1_1645)"
				/>
			</motion.g>
			<defs>
				<linearGradient id="paint0_linear_1_1645" x1="21.3172" y1="19.5576" x2="24.2457" y2="44.1321" gradientUnits="userSpaceOnUse">
					<stop stopColor="#FCC12D" />
					<stop offset="1" stopColor="#FB7332" />
				</linearGradient>
				<linearGradient id="paint1_linear_1_1645" x1="38.7977" y1="4.03901" x2="34.9778" y2="36.3807" gradientUnits="userSpaceOnUse">
					<stop stopColor="#FCC12D" />
					<stop offset="1" stopColor="#FB7332" />
				</linearGradient>
				<linearGradient id="paint2_linear_1_1645" x1="41.4448" y1="18.2009" x2="52.3951" y2="39.2102" gradientUnits="userSpaceOnUse">
					<stop stopColor="#FCC12D" />
					<stop offset="1" stopColor="#FB7332" />
				</linearGradient>
				<linearGradient id="paint3_linear_1_1645" x1="41.4091" y1="51.4755" x2="36.0896" y2="44.4016" gradientUnits="userSpaceOnUse">
					<stop stopColor="#FC3200" />
					<stop offset="1" stopColor="#E06124" />
				</linearGradient>
				<linearGradient id="paint4_linear_1_1645" x1="22.9015" y1="60.0534" x2="21.2462" y2="48.721" gradientUnits="userSpaceOnUse">
					<stop stopColor="#FC3200" />
					<stop offset="1" stopColor="#E06124" />
				</linearGradient>
				<linearGradient id="paint5_linear_1_1645" x1="10.597" y1="59.1674" x2="6.39514" y2="42.2326" gradientUnits="userSpaceOnUse">
					<stop stopColor="#FC3200" />
					<stop offset="1" stopColor="#E06124" />
				</linearGradient>
				<linearGradient id="paint6_linear_1_1645" x1="5.22671" y1="35.2695" x2="11.1704" y2="45.0765" gradientUnits="userSpaceOnUse">
					<stop stopColor="#FCC12D" />
					<stop offset="1" stopColor="#FB7332" />
				</linearGradient>
				<linearGradient id="paint7_linear_1_1645" x1="29.8892" y1="11.3465" x2="32.0245" y2="14.8699" gradientUnits="userSpaceOnUse">
					<stop stopColor="#FCEF9C" />
					<stop offset="1" stopColor="#EDE59C" />
				</linearGradient>
				<linearGradient id="paint8_linear_1_1645" x1="0.0086301" y1="17.0165" x2="9.97865" y2="33.4671" gradientUnits="userSpaceOnUse">
					<stop stopColor="#FCBB44" />
					<stop offset="1" stopColor="#EDD500" />
				</linearGradient>
				<linearGradient id="paint9_linear_1_1645" x1="25.4206" y1="1.70953" x2="31.3617" y2="11.5122" gradientUnits="userSpaceOnUse">
					<stop stopColor="#FCBB44" />
					<stop offset="1" stopColor="#EDD500" />
				</linearGradient>
				<linearGradient id="paint10_linear_1_1645" x1="36.1501" y1="39.3975" x2="34.6222" y2="39.4399" gradientUnits="userSpaceOnUse">
					<stop stopColor="#A13210" />
					<stop offset="1" stopColor="#CC2900" />
				</linearGradient>
				<linearGradient id="paint11_linear_1_1645" x1="37.8309" y1="35.8929" x2="35.7439" y2="35.9508" gradientUnits="userSpaceOnUse">
					<stop stopColor="#A13210" />
					<stop offset="1" stopColor="#CC2900" />
				</linearGradient>
				<linearGradient id="paint12_linear_1_1645" x1="6.8225" y1="15.2709" x2="5.6341" y2="33.3517" gradientUnits="userSpaceOnUse">
					<stop stopColor="#D97F00" />
					<stop offset="1" stopColor="#ED7300" />
				</linearGradient>
				<linearGradient id="paint13_linear_1_1645" x1="29.6857" y1="14.6285" x2="43.3241" y2="39.5286" gradientUnits="userSpaceOnUse">
					<stop stopColor="white" />
					<stop offset="0.5726" stopColor="#F8F8F8" />
				</linearGradient>
				<linearGradient id="paint14_linear_1_1645" x1="6.86998" y1="20.8725" x2="16.619" y2="21.0426" gradientUnits="userSpaceOnUse">
					<stop stopColor="white" />
					<stop offset="0.5726" stopColor="#F8F8F8" />
				</linearGradient>
				<linearGradient id="paint15_linear_1_1645" x1="24.4905" y1="23.4366" x2="20.4138" y2="20.8887" gradientUnits="userSpaceOnUse">
					<stop stopColor="white" />
					<stop offset="0.5726" stopColor="#F8F8F8" />
				</linearGradient>
				<linearGradient id="paint16_linear_1_1645" x1="11.389" y1="39.922" x2="8.88489" y2="38.3516" gradientUnits="userSpaceOnUse">
					<stop stopColor="#D97F00" />
					<stop offset="1" stopColor="#E65400" />
				</linearGradient>
				<linearGradient id="paint17_linear_1_1645" x1="7.36755" y1="38.9677" x2="6.09429" y2="42.0872" gradientUnits="userSpaceOnUse">
					<stop stopColor="#A13210" />
					<stop offset="1" stopColor="#CC2900" />
				</linearGradient>
				<linearGradient id="paint18_linear_1_1645" x1="38.232" y1="54.4282" x2="36.987" y2="48.2598" gradientUnits="userSpaceOnUse">
					<stop stopColor="#FC3200" />
					<stop offset="1" stopColor="#E06124" />
				</linearGradient>
				<linearGradient id="paint19_linear_1_1645" x1="35.2552" y1="42.4234" x2="36.4295" y2="43.5836" gradientUnits="userSpaceOnUse">
					<stop stopColor="#731B00" />
					<stop offset="1" stopColor="#B02300" />
				</linearGradient>
				<linearGradient id="paint20_linear_1_1645" x1="35.2319" y1="42.6255" x2="27.0262" y2="54.5096" gradientUnits="userSpaceOnUse">
					<stop stopColor="#750000" />
					<stop offset="0.1343" stopColor="#770404" />
					<stop offset="0.2655" stopColor="#7D1010" />
					<stop offset="0.3954" stopColor="#872323" />
					<stop offset="0.5246" stopColor="#953F3F" />
					<stop offset="0.6533" stopColor="#A66262" />
					<stop offset="0.7816" stopColor="#BC8E8E" />
					<stop offset="0.9072" stopColor="#D6C1C1" />
					<stop offset="1" stopColor="#EBEBEB" />
				</linearGradient>
				<linearGradient id="paint21_linear_1_1645" x1="34.5598" y1="15.4271" x2="32.1172" y2="26.7676" gradientUnits="userSpaceOnUse">
					<stop stopColor="#FCBB44" />
					<stop offset="1" stopColor="#EDD500" />
				</linearGradient>
				<linearGradient id="paint22_linear_1_1645" x1="34.5598" y1="15.4271" x2="32.1172" y2="26.7676" gradientUnits="userSpaceOnUse">
					<stop stopColor="white" />
					<stop offset="0.5726" stopColor="#F8F8F8" />
				</linearGradient>
				<linearGradient id="paint23_linear_1_1645" x1="48.2546" y1="43.3106" x2="49.4996" y2="34.539" gradientUnits="userSpaceOnUse">
					<stop stopColor="#FFCCCC" />
					<stop offset="0.3956" stopColor="#FFEEEE" />
					<stop offset="0.5726" stopColor="white" />
					<stop offset="1" stopColor="#F8F8F8" />
				</linearGradient>
				<linearGradient id="paint24_linear_1_1645" x1="41.2299" y1="42.1839" x2="53.3969" y2="28.9417" gradientUnits="userSpaceOnUse">
					<stop stopColor="#FFCCCC" />
					<stop offset="0.3956" stopColor="#FFEEEE" />
					<stop offset="0.5726" stopColor="white" />
					<stop offset="1" stopColor="#F8F8F8" />
				</linearGradient>
				<linearGradient id="paint25_linear_1_1645" x1="47.4915" y1="44.3816" x2="35.5226" y2="6.60735" gradientUnits="userSpaceOnUse">
					<stop stopColor="#FFCCCC" />
					<stop offset="0.3956" stopColor="#FFEEEE" />
					<stop offset="0.5726" stopColor="white" />
					<stop offset="1" stopColor="#F8F8F8" />
				</linearGradient>
				<linearGradient id="paint26_linear_1_1645" x1="11.752" y1="40.8216" x2="23.024" y2="38.5433" gradientUnits="userSpaceOnUse">
					<stop stopColor="#CC0000" />
					<stop offset="1" stopColor="#8C2A2A" />
				</linearGradient>
				<linearGradient id="paint27_linear_1_1645" x1="32.9416" y1="13.2838" x2="31.1802" y2="12.6047" gradientUnits="userSpaceOnUse">
					<stop stopColor="white" />
					<stop offset="0.5726" stopColor="#F8F8F8" />
				</linearGradient>
				<linearGradient id="paint28_linear_1_1645" x1="27.4774" y1="12.6773" x2="32.7687" y2="13.7153" gradientUnits="userSpaceOnUse">
					<stop stopColor="white" />
					<stop offset="0.5726" stopColor="#F8F8F8" />
				</linearGradient>
				<linearGradient id="paint29_linear_1_1645" x1="31.7639" y1="10.4508" x2="31.1696" y2="13.2096" gradientUnits="userSpaceOnUse">
					<stop stopColor="white" />
					<stop offset="0.5726" stopColor="#F8F8F8" />
				</linearGradient>
				<linearGradient id="paint30_linear_1_1645" x1="27.2369" y1="15.04" x2="10.9085" y2="8.74465" gradientUnits="userSpaceOnUse">
					<stop stopColor="#FCBB44" />
					<stop offset="1" stopColor="#EDE7B2" />
				</linearGradient>
				<linearGradient id="paint31_linear_1_1645" x1="15.4927" y1="15.4532" x2="20.5494" y2="23.7968" gradientUnits="userSpaceOnUse">
					<stop stopColor="#FFCCCC" />
					<stop offset="0.3956" stopColor="#FFEEEE" />
					<stop offset="0.5726" stopColor="white" />
					<stop offset="1" stopColor="#F8F8F8" />
				</linearGradient>
				<linearGradient id="paint32_linear_1_1645" x1="11.3843" y1="11.8936" x2="19.8901" y2="25.9282" gradientUnits="userSpaceOnUse">
					<stop stopColor="#FFCCCC" />
					<stop offset="0.3956" stopColor="#FFEEEE" />
					<stop offset="0.5726" stopColor="white" />
					<stop offset="1" stopColor="#F8F8F8" />
				</linearGradient>
				<linearGradient id="paint33_linear_1_1645" x1="15.6904" y1="14.9377" x2="21.6614" y2="24.7899" gradientUnits="userSpaceOnUse">
					<stop stopColor="#FFCCCC" />
					<stop offset="0.3956" stopColor="#FFEEEE" />
					<stop offset="0.5726" stopColor="white" />
					<stop offset="1" stopColor="#F8F8F8" />
				</linearGradient>
				<linearGradient id="paint34_linear_1_1645" x1="24.3788" y1="23.1407" x2="8.08211" y2="16.8576" gradientUnits="userSpaceOnUse">
					<stop stopColor="#FFCCCC" />
					<stop offset="0.3956" stopColor="#FFEEEE" />
					<stop offset="0.5726" stopColor="white" />
					<stop offset="1" stopColor="#F8F8F8" />
				</linearGradient>
				<clipPath id="clip0_1_1645">
					<rect width="51.3036" height="60" fill="white" />
				</clipPath>
			</defs>
		</motion.svg>
	);
};

export default CrystalAnimation3;
