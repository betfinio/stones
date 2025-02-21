import { motion } from 'framer-motion';

const CrystalAnimation2 = () => {
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
			width="42"
			height="60"
			viewBox="0 0 42 60"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className="w-full h-full"
		>
			<title className="hidden">Crystal Animation 2</title>
			<motion.g clipPath="url(#clip0_1_1264)">
				<motion.path
					variants={pathVariants}
					custom={0}
					d="M35.6843 26.765L28.2867 39.2548L12.4388 25.2548L2.81836 16.7592L20.3018 0.0197754L28.6547 6.41792L35.6843 26.765Z"
					fill="url(#paint0_linear_1_1264)"
				/>
				<motion.path
					variants={pathVariants}
					custom={1}
					d="M20.3042 0.0208938L26.0802 0L33.4325 5.55427L28.6536 6.41672L20.3042 0.0208938Z"
					fill="url(#paint1_linear_1_1264)"
				/>
				<motion.path
					variants={pathVariants}
					custom={2}
					d="M33.4324 5.5542L41.6054 26.5594L35.6832 26.7649L28.6536 6.41665L33.4324 5.5542Z"
					fill="url(#paint2_linear_1_1264)"
				/>
				<motion.path
					variants={pathVariants}
					custom={3}
					d="M28.2867 39.2547L23.3767 59.9987L11.9919 53.6749L2.81836 16.759L12.4388 25.2547L28.2867 39.2547Z"
					fill="url(#paint3_linear_1_1264)"
				/>
				<motion.path
					variants={pathVariants}
					custom={4}
					d="M27.8434 59.978L23.3779 60.0001L28.2891 39.2549L35.6832 26.765L41.6054 26.5596L38.6966 42.6606L27.8434 59.978Z"
					fill="url(#paint4_linear_1_1264)"
				/>
				<motion.path
					variants={pathVariants}
					custom={5}
					opacity="0.5"
					d="M20.3018 0.0197754L17.0644 10.404L11.3813 8.56534L2.81836 16.7592L20.3018 0.0197754Z"
					fill="url(#paint5_linear_1_1264)"
				/>
				<motion.path
					variants={pathVariants}
					custom={6}
					d="M17.0644 10.4038L12.4388 25.2547L12.4249 25.2918L11.9919 53.6749L2.81836 16.759L11.3813 8.56519L17.0644 10.4038Z"
					fill="url(#paint6_linear_1_1264)"
				/>
				<motion.path
					variants={pathVariants}
					custom={7}
					opacity="0.5"
					d="M20.3019 0.0197754L17.0854 10.4086L20.4192 20.3587L27.1272 14.5003L28.6536 6.41676L20.3019 0.0197754Z"
					fill="url(#paint7_linear_1_1264)"
				/>
				<motion.path variants={pathVariants} custom={8} d="M35.6832 26.765L27.1272 14.5003L28.6536 6.41675L35.6832 26.765Z" fill="url(#paint8_linear_1_1264)" />
				<motion.path variants={pathVariants} custom={9} d="M35.683 26.7649L20.4189 20.3586L27.127 14.5002L35.683 26.7649Z" fill="url(#paint9_linear_1_1264)" />
				<motion.path
					variants={pathVariants}
					custom={10}
					opacity="0.5"
					d="M35.6831 26.7649L21.2571 27.2443L12.4387 25.2548L20.419 20.3586L35.6831 26.7649Z"
					fill="url(#paint10_linear_1_1264)"
				/>
				<motion.path
					variants={pathVariants}
					custom={11}
					opacity="0.75"
					d="M12.4387 25.2549L20.419 20.3588L17.0853 10.4087L12.4387 25.2549Z"
					fill="url(#paint11_linear_1_1264)"
				/>
				<motion.path variants={pathVariants} custom={12} d="M12.4387 25.2549L17.2884 29.335L21.2571 27.2444L12.4387 25.2549Z" fill="#F6E9FF" />
				<motion.path
					variants={pathVariants}
					custom={13}
					opacity="0.25"
					d="M35.6831 26.765L28.289 39.2549L12.4387 25.2549L21.2571 27.2444L35.6831 26.765Z"
					fill="url(#paint12_linear_1_1264)"
				/>
				<motion.path variants={pathVariants} custom={14} opacity="0.5" d="M23.3778 60.0001L12.4387 25.2549L20.0278 44.4772L23.3778 60.0001Z" fill="white" />
				<motion.path
					variants={pathVariants}
					custom={15}
					d="M28.6535 6.41676L23.7724 2.28675L20.3018 0.0197754L28.6535 6.41676Z"
					fill="url(#paint13_linear_1_1264)"
				/>
				<motion.path
					variants={pathVariants}
					custom={16}
					d="M28.6536 6.41675L26.5398 13.1643L27.1271 14.5003L28.6536 6.41675Z"
					fill="url(#paint14_linear_1_1264)"
				/>
				<motion.path
					variants={pathVariants}
					custom={17}
					d="M26.5399 13.1644L27.1272 14.5004L20.4192 20.3588L17.0854 10.4087L26.5399 13.1644Z"
					fill="url(#paint15_linear_1_1264)"
				/>
				<motion.path
					variants={pathVariants}
					custom={18}
					opacity="0.45"
					d="M2.81836 16.759L12.4388 25.2547L5.99654 29.9685L2.81836 16.759Z"
					fill="url(#paint16_linear_1_1264)"
				/>
				<motion.path
					variants={pathVariants}
					custom={19}
					d="M17.083 10.4096L12.4388 25.2547L2.81836 16.759L11.3813 8.56519L17.0644 10.4038L17.083 10.4096Z"
					fill="url(#paint17_linear_1_1264)"
				/>
				<motion.path
					variants={pathVariants}
					custom={20}
					opacity="0.5"
					d="M12.4387 25.2549L17.2884 29.335L17.4556 37.8991L12.4387 25.2549Z"
					fill="url(#paint18_linear_1_1264)"
				/>
				<motion.path
					variants={pathVariants}
					custom={21}
					opacity="0.5"
					d="M12.4388 25.2549L5.99658 29.9688L12.2009 39.0645L12.4388 25.2549Z"
					fill="url(#paint19_linear_1_1264)"
				/>
				<motion.path
					variants={pathVariants}
					custom={22}
					d="M12.4387 25.2548C13.639 24.3598 14.939 23.5252 16.2646 22.7057C17.5995 21.892 18.9587 21.0946 20.419 20.3586C19.2199 21.2548 17.9187 22.0882 16.5931 22.9077C15.2582 23.7202 13.8978 24.5177 12.4387 25.2548Z"
					fill="url(#paint20_linear_1_1264)"
				/>
				<motion.path
					variants={pathVariants}
					custom={23}
					d="M28.289 39.2549C26.8891 38.122 25.531 36.9705 24.1799 35.8167C22.8276 34.6629 21.5101 33.4952 20.1729 32.3356C18.867 31.162 17.5449 29.9966 16.2542 28.8173L14.3261 27.0448C13.697 26.4482 13.0551 25.8562 12.4387 25.2549C13.1421 25.8202 13.8212 26.3948 14.5142 26.9647L16.549 28.6919C17.9001 29.8457 19.2199 31.0134 20.556 32.173C21.8607 33.3466 23.1851 34.512 24.4735 35.6925C25.7632 36.8718 27.047 38.0546 28.289 39.2549Z"
					fill="url(#paint21_linear_1_1264)"
				/>
				<motion.path
					variants={pathVariants}
					custom={24}
					d="M17.2886 29.3348C17.6716 29.0992 18.0628 28.8705 18.454 28.6407L18.4308 28.6639L18.584 28.2484L18.6142 28.1659L18.7419 28.2112L19.0843 28.3319L18.9438 28.3377L21.1319 27.1549L21.1771 27.1305L21.2456 27.1271C23.6473 27.0214 26.0512 26.939 28.4575 26.8728C29.66 26.8392 30.8637 26.8183 32.0674 26.7974C33.2712 26.773 34.476 26.7661 35.6821 26.7649C34.483 26.8438 33.2839 26.917 32.0837 26.9727C30.8835 27.033 29.6832 27.0911 28.4818 27.1375C26.0791 27.2315 23.6739 27.3093 21.2677 27.3638L21.3814 27.336L19.0982 28.4492L19.0274 28.484L18.9578 28.455L18.6304 28.3192L18.7883 28.2809L18.5793 28.6871L18.5712 28.7022L18.5561 28.7103C18.1348 28.9204 17.7157 29.1294 17.2886 29.3348Z"
					fill="white"
				/>
				<motion.path
					variants={pathVariants}
					custom={25}
					opacity="0.72"
					d="M12.4387 25.2547L17.4556 37.8989L17.2884 29.3336L18.4875 28.6964L18.6616 28.2123C18.6616 28.2123 18.9936 28.3481 19.0005 28.3551C19.0087 28.3621 21.293 27.2048 21.293 27.2048L20.4201 20.3574L12.4387 25.2547Z"
					fill="white"
				/>
				<motion.path
					variants={pathVariants}
					custom={26}
					d="M35.6832 26.765L28.2903 39.2549L38.6977 42.6606L41.6078 26.5596C41.6054 26.5596 35.6809 26.765 35.6832 26.765Z"
					fill="url(#paint22_linear_1_1264)"
				/>
				<motion.path
					variants={pathVariants}
					custom={27}
					d="M28.6536 6.41682L30.9565 6.021L29.1121 6.17538L28.6536 6.41682Z"
					fill="url(#paint23_linear_1_1264)"
				/>
				<motion.path
					variants={pathVariants}
					custom={28}
					d="M7.53345 35.7319L7.76676 36.6803L18.0186 43.0343L16.9264 39.5091L7.53345 35.7319Z"
					fill="url(#paint24_linear_1_1264)"
				/>
				<motion.path
					variants={pathVariants}
					custom={29}
					d="M18.3506 40.2634L20.0279 44.477L26.079 48.6326L27.4835 42.6616L18.3506 40.2634Z"
					fill="url(#paint25_linear_1_1264)"
				/>
			</motion.g>
			<defs>
				<linearGradient id="paint0_linear_1_1264" x1="-3.70261" y1="18.1446" x2="33.655" y2="20.137" gradientUnits="userSpaceOnUse">
					<stop stopColor="#9435F8" />
					<stop offset="1" stopColor="#9BBDF8" />
				</linearGradient>
				<linearGradient id="paint1_linear_1_1264" x1="20.3041" y1="3.20857" x2="33.4323" y2="3.20857" gradientUnits="userSpaceOnUse">
					<stop stopColor="#9BBDF8" />
					<stop offset="1" stopColor="#1A74C3" />
				</linearGradient>
				<linearGradient id="paint2_linear_1_1264" x1="32.0381" y1="4.63693" x2="37.7085" y2="26.3734" gradientUnits="userSpaceOnUse">
					<stop stopColor="#34A6EC" />
					<stop offset="0.5" stopColor="#D0CCDB" />
					<stop offset="1" stopColor="#8BBFF9" />
				</linearGradient>
				<linearGradient id="paint3_linear_1_1264" x1="2.8189" y1="38.3787" x2="28.2869" y2="38.3787" gradientUnits="userSpaceOnUse">
					<stop stopColor="#6E41B0" />
					<stop offset="1" stopColor="#D8A0F9" />
				</linearGradient>
				<linearGradient id="paint4_linear_1_1264" x1="29.1237" y1="56.5445" x2="37.3005" y2="27.3733" gradientUnits="userSpaceOnUse">
					<stop stopColor="#34A6EC" />
					<stop offset="0.2821" stopColor="#D0CCDB" />
					<stop offset="1" stopColor="#8BBFF9" />
				</linearGradient>
				<linearGradient id="paint5_linear_1_1264" x1="10.7111" y1="11.1633" x2="12.8347" y2="4.48913" gradientUnits="userSpaceOnUse">
					<stop stopColor="#90CAEC" />
					<stop offset="1" stopColor="#DFB3F9" />
				</linearGradient>
				<linearGradient id="paint6_linear_1_1264" x1="2.8189" y1="31.1201" x2="17.0647" y2="31.1201" gradientUnits="userSpaceOnUse">
					<stop stopColor="#6E41B0" />
					<stop offset="1" stopColor="#D8A0F9" />
				</linearGradient>
				<linearGradient id="paint7_linear_1_1264" x1="17.0857" y1="10.1895" x2="28.6539" y2="10.1895" gradientUnits="userSpaceOnUse">
					<stop stopColor="#90CAEC" />
					<stop offset="1" stopColor="#DFB3F9" />
				</linearGradient>
				<linearGradient id="paint8_linear_1_1264" x1="32.366" y1="24.8154" x2="28.6105" y2="8.47099" gradientUnits="userSpaceOnUse">
					<stop stopColor="#72BBE8" />
					<stop offset="0.5" stopColor="#D0CCDB" />
					<stop offset="1" stopColor="#8BBFF9" />
				</linearGradient>
				<linearGradient id="paint9_linear_1_1264" x1="27.6262" y1="25.2103" x2="30.9108" y2="12.4509" gradientUnits="userSpaceOnUse">
					<stop stopColor="#ACD5EC" />
					<stop offset="1" stopColor="white" />
				</linearGradient>
				<linearGradient id="paint10_linear_1_1264" x1="20.5017" y1="29.0387" x2="25.9583" y2="24.3949" gradientUnits="userSpaceOnUse">
					<stop stopColor="#90CAEC" />
					<stop offset="1" stopColor="#DFB3F9" />
				</linearGradient>
				<linearGradient id="paint11_linear_1_1264" x1="14.4242" y1="17.8497" x2="23.7145" y2="17.3564" gradientUnits="userSpaceOnUse">
					<stop stopColor="#72BBE8" />
					<stop offset="0.5" stopColor="#D0CCDB" />
					<stop offset="1" stopColor="#8BBFF9" />
				</linearGradient>
				<linearGradient id="paint12_linear_1_1264" x1="30.2036" y1="32.1109" x2="21.894" y2="27.9194" gradientUnits="userSpaceOnUse">
					<stop stopColor="#6ABBEC" />
					<stop offset="1" stopColor="white" />
				</linearGradient>
				<linearGradient id="paint13_linear_1_1264" x1="24.0895" y1="4.60479" x2="24.9498" y2="1.53557" gradientUnits="userSpaceOnUse">
					<stop stopColor="#ACD5EC" />
					<stop offset="1" stopColor="white" />
				</linearGradient>
				<linearGradient id="paint14_linear_1_1264" x1="26.972" y1="13.3384" x2="28.7773" y2="6.89789" gradientUnits="userSpaceOnUse">
					<stop stopColor="#BFDBEC" />
					<stop offset="1" stopColor="white" />
				</linearGradient>
				<linearGradient id="paint15_linear_1_1264" x1="22.0727" y1="12.6886" x2="20.4096" y2="24.2299" gradientUnits="userSpaceOnUse">
					<stop stopColor="#72BBE8" />
					<stop offset="0.5" stopColor="#D0CCDB" />
					<stop offset="1" stopColor="#8BBFF9" />
				</linearGradient>
				<linearGradient id="paint16_linear_1_1264" x1="6.1035" y1="17.4912" x2="9.06013" y2="27.1003" gradientUnits="userSpaceOnUse">
					<stop stopColor="#11699E" />
					<stop offset="1" stopColor="#BB52F9" />
				</linearGradient>
				<linearGradient id="paint17_linear_1_1264" x1="2.8189" y1="16.9098" x2="17.0833" y2="16.9098" gradientUnits="userSpaceOnUse">
					<stop stopColor="#90CAEC" />
					<stop offset="1" stopColor="#DFB3F9" />
				</linearGradient>
				<linearGradient id="paint18_linear_1_1264" x1="15.1318" y1="31.4291" x2="17.7628" y2="29.3177" gradientUnits="userSpaceOnUse">
					<stop stopColor="#6E41B0" />
					<stop offset="1" stopColor="#D8A0F9" />
				</linearGradient>
				<linearGradient id="paint19_linear_1_1264" x1="11.711" y1="32.4199" x2="16.1524" y2="28.8558" gradientUnits="userSpaceOnUse">
					<stop stopColor="#6E41B0" />
					<stop offset="1" stopColor="#D8A0F9" />
				</linearGradient>
				<linearGradient id="paint20_linear_1_1264" x1="12.2739" y1="22.8067" x2="20.5835" y2="22.8067" gradientUnits="userSpaceOnUse">
					<stop stopColor="#E7D7FF" />
					<stop offset="1" stopColor="#D8A0F9" />
				</linearGradient>
				<linearGradient id="paint21_linear_1_1264" x1="12.2473" y1="32.2549" x2="28.4805" y2="32.2549" gradientUnits="userSpaceOnUse">
					<stop stopColor="#E7D7FF" />
					<stop offset="1" stopColor="#D8A0F9" />
				</linearGradient>
				<linearGradient id="paint22_linear_1_1264" x1="33.2118" y1="42.5637" x2="37.2002" y2="20.3737" gradientUnits="userSpaceOnUse">
					<stop stopColor="#A8D2EC" />
					<stop offset="0.2821" stopColor="#D0CCDB" />
					<stop offset="1" stopColor="#8BBFF9" />
				</linearGradient>
				<linearGradient id="paint23_linear_1_1264" x1="29.727" y1="6.65343" x2="29.9213" y2="5.57257" gradientUnits="userSpaceOnUse">
					<stop stopColor="#A8D2EC" />
					<stop offset="0.2821" stopColor="#D0CCDB" />
					<stop offset="1" stopColor="#8BBFF9" />
				</linearGradient>
				<linearGradient id="paint24_linear_1_1264" x1="12.254" y1="42.2873" x2="13.5536" y2="35.0568" gradientUnits="userSpaceOnUse">
					<stop stopColor="white" />
					<stop offset="1" stopColor="#D6E7F9" />
				</linearGradient>
				<linearGradient id="paint25_linear_1_1264" x1="21.7023" y1="48.2195" x2="23.3771" y2="38.9015" gradientUnits="userSpaceOnUse">
					<stop stopColor="white" />
					<stop offset="1" stopColor="#D6E7F9" />
				</linearGradient>
				<clipPath id="clip0_1_1264">
					<rect width="41.6053" height="60" fill="white" />
				</clipPath>
			</defs>
		</motion.svg>
	);
};

export default CrystalAnimation2;
