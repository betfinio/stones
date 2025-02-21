import { motion } from 'framer-motion';

const CrystalAnimation4 = () => {
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
			width="48"
			height="60"
			viewBox="0 0 48 60"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			initial="hidden"
			animate="visible"
			className="w-full h-full"
		>
			<title className="hidden">Crystal Animation 4</title>
			<motion.g clipPath="url(#clip0_1_1855)">
				<motion.path
					variants={pathVariants}
					custom={1}
					d="M12.8249 25.96L13.755 29.2375L14.8372 33.045L15.8814 36.7216L16.4414 38.6879L17.2826 41.6593L17.7876 43.4306L18.8088 47.0271L20.068 51.4618L21.9643 58.1348L27.5601 60.0001L33.8621 27.8212L12.8249 25.96Z"
					fill="url(#paint0_linear_1_1855)"
				/>
				<motion.path
					variants={pathVariants}
					custom={2}
					d="M-2.67029e-05 14.176L1.84425 18.4117V18.4137L3.96557 23.2844V23.2864L6.33592 28.7322L7.34908 31.0586L9.67243 36.4004L10.4915 38.2756V38.2786L13.802 45.8838L22.0093 58.1016L17.3846 41.8222L17.3466 41.6822L16.7215 39.4858L15.8564 36.4394L14.9832 33.3669V33.3639L13.8 29.2063V29.2033L12.8699 25.9268L-2.67029e-05 14.176Z"
					fill="url(#paint1_linear_1_1855)"
				/>
				<motion.path
					variants={pathVariants}
					custom={3}
					d="M27.5602 60L33.128 50.9827L34.0241 49.5265L38.1098 42.8875L39.786 40.1641L44.0366 33.258V33.255L46.9461 28.5273V28.5253L47.7262 27.2611L39.0529 21.4783L33.8611 27.8202L27.5602 60Z"
					fill="url(#paint2_linear_1_1855)"
				/>
				<motion.path
					variants={pathVariants}
					custom={4}
					d="M18.3717 15.1082L12.8469 25.9848L33.8621 27.8211L32.8929 18.1696L18.3717 15.1082Z"
					fill="url(#paint3_linear_1_1855)"
				/>
				<motion.path
					variants={pathVariants}
					custom={5}
					d="M9.51238 0L18.3717 15.1083L12.8699 25.9559L-5.14984e-05 14.1761L9.51238 0Z"
					fill="url(#paint4_linear_1_1855)"
				/>
				<motion.path
					variants={pathVariants}
					custom={6}
					d="M32.8929 18.1697L34.2261 12.5899L9.51237 0L18.3717 15.1083L32.8929 18.1697Z"
					fill="url(#paint5_linear_1_1855)"
				/>
				<motion.path variants={pathVariants} custom={7} d="M47.7491 27.232L34.2261 12.5898L32.8929 18.1697L47.7491 27.232Z" fill="url(#paint6_linear_1_1855)" />
				<motion.path
					variants={pathVariants}
					custom={8}
					d="M33.8621 27.8211L47.7491 27.232L32.8929 18.1697L33.8621 27.8211Z"
					fill="url(#paint7_linear_1_1855)"
				/>
				<motion.g opacity="0.1">
					<motion.path variants={pathVariants} custom={9} d="M13.8001 29.2034L14.8823 33.0119L32.2679 36.0604L33.022 32.1978L13.8001 29.2034Z" fill="black" />
					<motion.path variants={pathVariants} custom={10} d="M17.3276 41.6252L17.8327 43.3975L30.6516 44.4547L30.8947 43.2055L17.3276 41.6252Z" fill="black" />
					<motion.path variants={pathVariants} custom={11} d="M18.8538 46.9929L20.113 51.4286L28.9833 52.9078L29.2614 51.2806L18.8538 46.9929Z" fill="black" />
				</motion.g>
				<motion.path
					className="opacity-15"
					variants={pathVariants}
					custom={12}
					opacity="0.15"
					d="M1.8443 18.4138L3.96562 23.2845V23.2865L14.9833 33.3641L13.8001 29.2064V29.2034L1.8443 18.4138Z"
					fill="black"
				/>
				<motion.path
					className="opacity-15"
					variants={pathVariants}
					custom={13}
					opacity="0.15"
					d="M6.33588 28.7324L7.34903 31.0588L16.7214 39.486L15.8563 36.4396L6.33588 28.7324Z"
					fill="black"
				/>
				<motion.path
					className="opacity-15"
					variants={pathVariants}
					custom={14}
					opacity="0.15"
					d="M17.3465 41.6823L9.03429 34.9143L10.0074 37.1646L17.7876 43.4306L17.3465 41.6823Z"
					fill="black"
				/>
				<motion.path
					variants={pathVariants}
					custom={15}
					d="M34.2261 12.5898L32.8929 18.1697L36.5115 20.331L34.2261 12.5898Z"
					fill="url(#paint8_linear_1_1855)"
				/>
				<motion.path variants={pathVariants} custom={16} d="M32.8929 18.1697L34.2261 12.5899L9.51237 0L32.8929 18.1697Z" fill="url(#paint9_linear_1_1855)" />
				<motion.path
					variants={pathVariants}
					custom={17}
					opacity="0.1"
					d="M9.51237 0L12.8699 25.9559L-6.00815e-05 14.1761L9.51237 0Z"
					fill="url(#paint10_linear_1_1855)"
				/>
				<motion.path variants={pathVariants} custom={18} d="M12.8469 25.985L12.8619 26.035L33.8621 27.8213L12.8699 25.927L12.8469 25.985Z" fill="#085400" />
				<motion.path
					variants={pathVariants}
					custom={19}
					d="M34.2261 12.5899L47.7491 27.2321L34.2731 12.8349L32.8929 18.1697L34.1561 12.7649L9.51241 0L34.2261 12.5899Z"
					fill="#F0FFEE"
				/>
				<motion.path
					variants={pathVariants}
					custom={20}
					opacity="0.1"
					d="M12.8469 25.9849L18.3717 15.1082L13.367 6.60596L-5.14984e-05 14.1761L12.8469 25.9849Z"
					fill="#D8FFD4"
				/>
				<motion.path
					variants={pathVariants}
					custom={21}
					opacity="0.15"
					d="M9.51239 0L14.7272 8.89833L12.8469 25.9849L-3.71933e-05 14.1761L9.51239 0Z"
					fill="#0C6D01"
				/>
				<motion.path
					variants={pathVariants}
					custom={22}
					d="M12.8469 25.9849C13.559 28.6763 14.2981 31.3587 15.0422 34.0411L17.3036 42.0783L19.6229 50.0995L20.8031 54.1041L22.0093 58.1017L20.9251 54.0701L19.8149 50.0455L17.5526 42.0083L15.2333 33.9871C14.4501 31.3157 13.662 28.6463 12.8469 25.9849Z"
					fill="#072D01"
				/>
				<motion.path
					className="opacity-15"
					variants={pathVariants}
					custom={23}
					opacity="0.1"
					d="M32.2678 36.0605L44.0366 33.2581V33.2551L46.946 28.5273L33.022 32.1979L32.2678 36.0605Z"
					fill="black"
				/>
				<motion.path
					className="opacity-15"
					variants={pathVariants}
					custom={24}
					opacity="0.1"
					d="M30.6516 44.4547L38.1098 42.8875L39.786 40.1641L30.8947 43.2055L30.6516 44.4547Z"
					fill="black"
				/>
				<motion.path
					className="opacity-15"
					variants={pathVariants}
					custom={25}
					opacity="0.1"
					d="M33.1279 50.9826L34.024 49.5264L29.2613 51.2806L28.9833 52.9079L33.1279 50.9826Z"
					fill="black"
				/>
				<motion.path
					variants={pathVariants}
					custom={26}
					opacity="0.5"
					d="M33.8621 27.8211L32.8929 18.1696L18.3717 15.1082L33.8621 27.8211Z"
					fill="url(#paint11_linear_1_1855)"
				/>
				<motion.path
					variants={pathVariants}
					custom={27}
					d="M32.8929 18.1698L18.3718 15.1084L14.7272 8.89844L32.8929 18.1698Z"
					fill="url(#paint12_linear_1_1855)"
				/>
				<motion.path
					variants={pathVariants}
					custom={28}
					opacity="0.25"
					d="M32.8929 18.1696L18.3718 15.1082L12.8469 25.9848L32.8929 18.1696Z"
					fill="url(#paint13_linear_1_1855)"
				/>
				<motion.path
					variants={pathVariants}
					custom={29}
					d="M33.8621 27.8211L32.8929 18.1697L36.5115 20.331L33.8621 27.8211Z"
					fill="url(#paint14_linear_1_1855)"
				/>
			</motion.g>
			<defs>
				<linearGradient id="paint0_linear_1_1855" x1="24.5159" y1="56.7532" x2="23.117" y2="21.1275" gradientUnits="userSpaceOnUse">
					<stop stopColor="#075200" />
					<stop offset="0.5056" stopColor="#099109" />
					<stop offset="1" stopColor="#00450D" />
				</linearGradient>
				<linearGradient id="paint1_linear_1_1855" x1="8.56704" y1="23.9518" x2="12.6705" y2="44.4692" gradientUnits="userSpaceOnUse">
					<stop stopColor="#075200" />
					<stop offset="1" stopColor="#00450D" />
				</linearGradient>
				<linearGradient id="paint2_linear_1_1855" x1="40.8913" y1="54.0891" x2="29.4208" y2="17.1596" gradientUnits="userSpaceOnUse">
					<stop stopColor="#075200" />
					<stop offset="0.5056" stopColor="#099109" />
					<stop offset="1" stopColor="#00450D" />
				</linearGradient>
				<linearGradient id="paint3_linear_1_1855" x1="27.0572" y1="14.8972" x2="22.4839" y2="29.7261" gradientUnits="userSpaceOnUse">
					<stop stopColor="#32C424" />
					<stop offset="1" stopColor="#0B6B1D" />
				</linearGradient>
				<linearGradient id="paint4_linear_1_1855" x1="8.82597" y1="3.84864" x2="9.44773" y2="22.5008" gradientUnits="userSpaceOnUse">
					<stop stopColor="#A2D934" />
					<stop offset="0.4945" stopColor="#2EA833" />
					<stop offset="1" stopColor="#0D7A21" />
				</linearGradient>
				<linearGradient id="paint5_linear_1_1855" x1="18.3828" y1="16.5297" x2="21.4915" y2="8.3227" gradientUnits="userSpaceOnUse">
					<stop stopColor="#9EF046" />
					<stop offset="1" stopColor="#F0FF73" />
				</linearGradient>
				<linearGradient id="paint6_linear_1_1855" x1="39.7189" y1="23.2524" x2="41.1178" y2="19.5686" gradientUnits="userSpaceOnUse">
					<stop stopColor="#A4F053" />
					<stop offset="1" stopColor="#F3FF87" />
				</linearGradient>
				<linearGradient id="paint7_linear_1_1855" x1="40.7138" y1="18.0686" x2="39.8331" y2="28.4612" gradientUnits="userSpaceOnUse">
					<stop stopColor="#26C718" />
					<stop offset="1" stopColor="#0D7A21" />
				</linearGradient>
				<linearGradient id="paint8_linear_1_1855" x1="35.7116" y1="16.1235" x2="32.9434" y2="18.8448" gradientUnits="userSpaceOnUse">
					<stop offset="0.00195994" stopColor="#F8F8F8" />
					<stop offset="1" stopColor="#F8FF00" />
				</linearGradient>
				<linearGradient id="paint9_linear_1_1855" x1="24.2441" y1="6.09525" x2="19.2353" y2="11.0192" gradientUnits="userSpaceOnUse">
					<stop offset="0.00195994" stopColor="#F8F8F8" />
					<stop offset="1" stopColor="#F8FF00" />
				</linearGradient>
				<linearGradient id="paint10_linear_1_1855" x1="5.99914" y1="22.9504" x2="8.98348" y2="3.17906" gradientUnits="userSpaceOnUse">
					<stop offset="0.00195994" stopColor="#F8F8F8" />
					<stop offset="0.1232" stopColor="#F4F6F4" />
					<stop offset="0.2496" stopColor="#E8F1E7" />
					<stop offset="0.3784" stopColor="#D4E8D2" />
					<stop offset="0.5089" stopColor="#B8DCB5" />
					<stop offset="0.6406" stopColor="#95CD8F" />
					<stop offset="0.7734" stopColor="#69B961" />
					<stop offset="0.9046" stopColor="#36A32C" />
					<stop offset="1" stopColor="#0C9100" />
				</linearGradient>
				<linearGradient id="paint11_linear_1_1855" x1="32.3042" y1="14.1261" x2="24.3215" y2="23.594" gradientUnits="userSpaceOnUse">
					<stop stopColor="white" />
					<stop offset="0.5726" stopColor="#F8F8F8" />
				</linearGradient>
				<linearGradient id="paint12_linear_1_1855" x1="21.2162" y1="18.6656" x2="25.4596" y2="10.2721" gradientUnits="userSpaceOnUse">
					<stop stopColor="white" />
					<stop offset="0.5726" stopColor="#F8F8F8" />
				</linearGradient>
				<linearGradient id="paint13_linear_1_1855" x1="19.0316" y1="12.5103" x2="25.0936" y2="27.6186" gradientUnits="userSpaceOnUse">
					<stop stopColor="#FFFF31" />
					<stop offset="0.1133" stopColor="#FEFE53" />
					<stop offset="0.3622" stopColor="#FBFBAA" />
					<stop offset="0.5726" stopColor="#F8F8F8" />
				</linearGradient>
				<linearGradient id="paint14_linear_1_1855" x1="30.5023" y1="18.7224" x2="34.0929" y2="22.8258" gradientUnits="userSpaceOnUse">
					<stop stopColor="#33B320" />
					<stop offset="0.1051" stopColor="#52BE42" />
					<stop offset="0.3386" stopColor="#A3DA9A" />
					<stop offset="0.5726" stopColor="#F8F8F8" />
				</linearGradient>
				<clipPath id="clip0_1_1855">
					<rect width="47.7492" height="60" fill="white" transform="matrix(-1 0 0 1 47.7491 0)" />
				</clipPath>
			</defs>
		</motion.svg>
	);
};

export default CrystalAnimation4;
