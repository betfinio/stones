import { motion } from 'framer-motion';

const CrystalAnimation1 = () => {
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
		<motion.svg initial="hidden" animate="visible" viewBox="0 0 47 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
			<title className="hidden">Crystal Animation 1</title>
			<motion.g clipPath="url(#clip0_1_1434)">
				<motion.g clipPath="url(#clip1_1_1434)">
					<motion.path
						variants={pathVariants}
						custom={0}
						d="M32.1193 30.7486L31.7081 34.3721L31.6354 34.9967L31.1002 39.6917L30.8558 41.8432L30.4959 45.0126V45.015L30.1133 48.3584L29.9917 49.418L29.7402 51.6267L29.6496 52.4336L23.8139 52.0748L21.1117 51.9092L15.034 51.542L13.6406 45.1425L13.1376 42.8587L11.4141 35.0241L10.9647 32.9894V32.9871L10.5511 31.1109L9.65 27.0142L9.20898 25.0142L12.6823 25.3801H12.6847L14.7813 25.6006H14.7825L21.4109 26.2991L22.7673 26.4409L29.6496 27.1644L32.1193 30.7486Z"
						fill="url(#paint0_linear_1_1434)"
					/>
					<motion.path variants={pathVariants} custom={1} d="M32.1194 23.0427L29.6497 27.1645L32.1194 30.7486L35.489 27.7032L32.1194 23.0427Z" fill="#C27337" />
					<motion.path
						variants={pathVariants}
						custom={2}
						d="M32.1193 23.0428L29.6496 27.1645L16.8124 25.814L16.2486 25.7545H16.2474L9.20898 25.0143L11.5035 21.8234L11.6715 21.5898L12.1602 20.9092L13.1936 19.4729L13.9994 18.3525L14.4416 17.7363L14.9041 17.0926L15.5549 16.1867L17.9686 12.8278L22.0116 10.4988L24.4098 11.264H24.4122L28.2991 12.5048L29.4494 12.8719H29.4517L29.8737 13.0078L29.9023 13.1365L30.0131 13.6252L30.5054 15.8303L30.6187 16.3381L30.6997 16.7016L31.7641 21.4539L31.8428 21.8032L32.1193 23.0428Z"
						fill="url(#paint1_linear_1_1434)"
					/>
					<motion.path
						variants={pathVariants}
						custom={3}
						d="M16.6216 9.42346L17.9685 12.8276L22.0115 10.4986L20.4394 7.27319L16.6216 9.42346Z"
						fill="#C27337"
					/>
					<motion.path
						variants={pathVariants}
						custom={4}
						d="M9.88354 6.73574L16.6216 9.42357L20.4394 7.27331L19.5419 1.35889L9.88354 6.73574Z"
						fill="url(#paint2_linear_1_1434)"
					/>
					<motion.path
						variants={pathVariants}
						custom={5}
						d="M0 17.6671L9.88359 6.73584L16.6216 9.42367L17.9685 12.8279L9.20895 25.0143L0 17.6671Z"
						fill="url(#paint3_linear_1_1434)"
					/>
					<motion.path
						variants={pathVariants}
						custom={6}
						d="M15.0495 51.5372L8.08614 47.7743L0 17.667L9.20895 25.0141L15.0495 51.5372Z"
						fill="url(#paint4_linear_1_1434)"
					/>
					<motion.path
						variants={pathVariants}
						custom={7}
						d="M24.9319 60.0002L22.287 59.5222L8.08618 47.7744L15.0495 51.5374L29.6496 52.4337L24.9319 60.0002Z"
						fill="url(#paint5_linear_1_1434)"
					/>
					<motion.path
						variants={pathVariants}
						custom={8}
						d="M40.7049 47.6946L24.9319 60.0002L29.6496 52.4337L40.7049 47.6946Z"
						fill="url(#paint6_linear_1_1434)"
					/>
					<motion.path
						variants={pathVariants}
						custom={9}
						d="M35.489 27.7032L36.11 49.6707L40.705 47.6945L46.2952 19.3799L35.489 27.7032Z"
						fill="url(#paint7_linear_1_1434)"
					/>
					<motion.path
						variants={pathVariants}
						custom={10}
						d="M29.8735 13.0078L46.2949 19.3799L35.4888 27.7033L32.1192 23.0428L29.8735 13.0078Z"
						fill="url(#paint8_linear_1_1434)"
					/>
					<motion.path
						variants={pathVariants}
						custom={11}
						d="M19.542 1.35889L35.2148 4.48535L46.2951 19.3799L29.8737 13.0077L22.0117 10.4987L20.4395 7.27331L19.542 1.35889Z"
						fill="url(#paint9_linear_1_1434)"
					/>
					<motion.path variants={pathVariants} custom={12} d="M29.7236 6.9895L29.8738 13.0076L22.0117 10.4986L29.7236 6.9895Z" fill="#C27337" />
					<motion.path
						variants={pathVariants}
						custom={13}
						d="M35.2148 4.48535L22.0117 10.4987L20.4395 7.27331L19.542 1.35889L35.2148 4.48535Z"
						fill="url(#paint10_linear_1_1434)"
					/>
					<motion.path
						variants={pathVariants}
						custom={14}
						d="M36.1541 49.6564L35.5188 27.6973L32.1194 30.7486L29.6497 52.4336L36.1541 49.6564Z"
						fill="url(#paint11_linear_1_1434)"
					/>
					<motion.path
						variants={pathVariants}
						custom={15}
						d="M22.287 59.5222L15.0495 51.5374L8.08618 47.7744L22.287 59.5222Z"
						fill="url(#paint12_linear_1_1434)"
					/>
					<motion.g style={{ mixBlendMode: 'soft-light' }}>
						<motion.path
							variants={pathVariants}
							custom={17}
							opacity="0.15"
							d="M14.9041 17.0925L28.2991 12.5047L24.4122 11.2639H24.4098L15.5549 16.1866L14.9041 17.0925Z"
							fill="white"
						/>
						<motion.path
							variants={pathVariants}
							custom={18}
							opacity="0.15"
							d="M30.5053 15.8303L12.1602 20.9092L13.1936 19.4729L30.0131 13.6252L30.5053 15.8303Z"
							fill="white"
						/>
						<motion.path
							variants={pathVariants}
							custom={19}
							opacity="0.15"
							d="M29.9022 13.1364L13.9993 18.3524L14.4415 17.7361L29.4492 12.8718H29.4516L29.8736 13.0077L29.9022 13.1364Z"
							fill="white"
						/>
						<motion.path
							variants={pathVariants}
							custom={20}
							opacity="0.15"
							d="M11.5034 21.8235L30.6996 16.7017L30.6186 16.3381L11.6715 21.5898L11.5034 21.8235Z"
							fill="white"
						/>
						<motion.path
							variants={pathVariants}
							custom={21}
							opacity="0.15"
							d="M31.8427 21.8031L16.8123 25.814L16.2485 25.7544L31.764 21.4539L31.8427 21.8031Z"
							fill="white"
						/>
					</motion.g>
					<motion.path
						variants={pathVariants}
						custom={22}
						d="M16.6216 9.42346L20.4394 7.27319L22.0115 10.4986L17.9685 12.8276L16.6216 9.42346Z"
						fill="url(#paint13_linear_1_1434)"
					/>
					<motion.path
						variants={pathVariants}
						custom={23}
						d="M32.1229 30.7641L35.4926 27.7175L32.1194 23.0427L29.6497 27.1645L32.1229 30.7641Z"
						fill="url(#paint14_linear_1_1434)"
					/>
					<motion.path
						variants={pathVariants}
						custom={24}
						d="M29.8738 13.0076L29.7236 6.9895L22.0117 10.4986L29.8738 13.0076Z"
						fill="url(#paint15_linear_1_1434)"
					/>
					<motion.g style={{ mixBlendMode: 'color-burn' }} opacity="0.1">
						<motion.path
							variants={pathVariants}
							custom={25}
							d="M29.9916 49.418L29.7401 51.6267L11.414 35.0241L10.9646 32.9895L29.9916 49.418Z"
							fill="url(#paint16_linear_1_1434)"
						/>
						<motion.path
							variants={pathVariants}
							custom={26}
							d="M13.1375 42.8589L23.8125 52.075L21.1115 51.9093L13.6405 45.1426L13.1375 42.8589Z"
							fill="url(#paint17_linear_1_1434)"
						/>
						<motion.path
							variants={pathVariants}
							custom={27}
							d="M9.6499 27.0142L30.4958 45.0125V45.0149L30.1132 48.3583L10.551 31.1109L9.6499 27.0142Z"
							fill="url(#paint18_linear_1_1434)"
						/>
						<motion.path
							variants={pathVariants}
							custom={28}
							d="M31.1001 39.6918L30.8557 41.8432L12.6846 25.3801L14.7812 25.6006H14.7824L31.1001 39.6918Z"
							fill="url(#paint19_linear_1_1434)"
						/>
						<motion.path
							variants={pathVariants}
							custom={29}
							d="M31.7081 34.3721L31.6354 34.9967L21.4109 26.2991L22.7673 26.4409L31.7081 34.3721Z"
							fill="url(#paint20_linear_1_1434)"
						/>
					</motion.g>
					<motion.path
						variants={pathVariants}
						custom={30}
						opacity="0.75"
						d="M32.1847 23.4779C32.0858 23.4779 32.0691 23.3599 32.0512 23.28L29.7758 12.9578C29.7556 12.8672 29.7341 12.7694 29.8044 12.7623C29.8438 12.7587 29.8628 12.8636 29.8831 12.953L32.2503 23.2597C32.2706 23.3503 32.3349 23.4588 32.2217 23.4755C32.2098 23.4767 32.1967 23.4779 32.1847 23.4779Z"
						fill="white"
					/>
					<motion.path
						variants={pathVariants}
						custom={31}
						d="M32.0822 30.6998L32.1823 30.6951L29.6519 52.4492L32.0822 30.6998Z"
						fill="url(#paint21_linear_1_1434)"
					/>
					<motion.path variants={pathVariants} custom={32} d="M35.4926 27.7175L46.2951 19.3799L35.458 27.6877L35.4926 27.7175Z" fill="white" />
					<motion.path
						variants={pathVariants}
						custom={33}
						d="M46.295 19.3799L45.6407 22.9271L44.9672 26.4719L43.5905 33.5545L42.1721 40.6298L41.4486 44.1639L40.7048 47.6945L41.3592 44.1461L42.0327 40.6012L43.4094 33.5187L44.8278 26.4445L45.5525 22.9104L46.295 19.3799Z"
						fill="white"
					/>
					<motion.path
						variants={pathVariants}
						custom={34}
						d="M0 17.6671C0.395725 17.1975 0.800985 16.7362 1.20148 16.2702L2.41726 14.8863C3.22778 13.9637 4.05022 13.0519 4.87147 12.1389C5.69629 11.2294 6.52231 10.32 7.35786 9.42007L8.61298 8.07079C9.03612 7.62619 9.45449 7.17564 9.88239 6.73462C9.48667 7.20424 9.08141 7.66553 8.68092 8.13158L7.46514 9.51542C6.65461 10.438 5.83217 11.3498 5.00973 12.2628C4.18491 13.1723 3.35889 14.0818 2.52334 14.9817L1.26823 16.3309C0.846279 16.7767 0.427907 17.2261 0 17.6671Z"
						fill="white"
					/>
				</motion.g>
			</motion.g>
			<defs>
				<linearGradient id="paint0_linear_1_1434" x1="22.5001" y1="24.5999" x2="20.4001" y2="53.9999" gradientUnits="userSpaceOnUse">
					<stop stopColor="#C6A152" />
					<stop offset="0.265" stopColor="#C8A354" />
					<stop offset="0.52" stopColor="#E1C97D" />
					<stop offset="0.765" stopColor="#B79046" />
					<stop offset="1" stopColor="#D6B968" />
				</linearGradient>
				<linearGradient id="paint1_linear_1_1434" x1="23.4001" y1="8.69995" x2="20.4001" y2="30.3" gradientUnits="userSpaceOnUse">
					<stop stopColor="#C6A152" />
					<stop offset="0.265" stopColor="#C8A354" />
					<stop offset="0.52" stopColor="#E1C97D" />
					<stop offset="0.765" stopColor="#B79046" />
					<stop offset="1" stopColor="#D6B968" />
				</linearGradient>
				<linearGradient id="paint2_linear_1_1434" x1="12.9" y1="3.6001" x2="18.9" y2="13.8001" gradientUnits="userSpaceOnUse">
					<stop stopColor="#C6A152" />
					<stop offset="0.265" stopColor="#C8A354" />
					<stop offset="0.52" stopColor="#E1C97D" />
					<stop offset="0.765" stopColor="#B79046" />
					<stop offset="1" stopColor="#D6B968" />
				</linearGradient>
				<linearGradient id="paint3_linear_1_1434" x1="15" y1="5.40049" x2="2.1" y2="24.0005" gradientUnits="userSpaceOnUse">
					<stop stopColor="#C6A152" />
					<stop offset="0.265" stopColor="#C8A354" />
					<stop offset="0.52" stopColor="#E1C97D" />
					<stop offset="0.765" stopColor="#B79046" />
					<stop offset="1" stopColor="#D6B968" />
				</linearGradient>
				<linearGradient id="paint4_linear_1_1434" x1="7.52473" y1="17.667" x2="7.52473" y2="51.5372" gradientUnits="userSpaceOnUse">
					<stop stopColor="#C6A152" />
					<stop offset="0.265" stopColor="#C8A354" />
					<stop offset="0.52" stopColor="#E1C97D" />
					<stop offset="0.765" stopColor="#B79046" />
					<stop offset="1" stopColor="#D6B968" />
				</linearGradient>
				<linearGradient id="paint5_linear_1_1434" x1="20.7001" y1="42.9" x2="20.4001" y2="61.2" gradientUnits="userSpaceOnUse">
					<stop stopColor="#C6A152" />
					<stop offset="0.265" stopColor="#C8A354" />
					<stop offset="0.52" stopColor="#E1C97D" />
					<stop offset="0.68" stopColor="#BA944A" />
					<stop offset="0.955" stopColor="#B79046" />
				</linearGradient>
				<linearGradient id="paint6_linear_1_1434" x1="33.2999" y1="47.1004" x2="35.0999" y2="60.0004" gradientUnits="userSpaceOnUse">
					<stop stopColor="#C6A152" />
					<stop offset="0.265" stopColor="#C8A354" />
					<stop offset="0.44" stopColor="#E1C97D" />
					<stop offset="0.6" stopColor="#B79046" />
				</linearGradient>
				<linearGradient id="paint7_linear_1_1434" x1="36.9001" y1="25.2" x2="43.5001" y2="51" gradientUnits="userSpaceOnUse">
					<stop stopColor="#C6A152" />
					<stop offset="0.265" stopColor="#C8A354" />
					<stop offset="0.52" stopColor="#E1C97D" />
					<stop offset="0.765" stopColor="#B79046" />
					<stop offset="1" stopColor="#D6B968" />
				</linearGradient>
				<linearGradient id="paint8_linear_1_1434" x1="30" y1="12" x2="42.3" y2="26.1" gradientUnits="userSpaceOnUse">
					<stop stopColor="#C6A152" />
					<stop offset="0.265" stopColor="#C8A354" />
					<stop offset="0.52" stopColor="#E1C97D" />
					<stop offset="0.765" stopColor="#B79046" />
					<stop offset="1" stopColor="#D6B968" />
				</linearGradient>
				<linearGradient id="paint9_linear_1_1434" x1="31.8001" y1="11.4001" x2="48.3001" y2="13.8001" gradientUnits="userSpaceOnUse">
					<stop stopColor="#C6A152" />
					<stop offset="0.265" stopColor="#C8A354" />
					<stop offset="0.52" stopColor="#E1C97D" />
					<stop offset="0.765" stopColor="#B79046" />
					<stop offset="1" stopColor="#D6B968" />
				</linearGradient>
				<linearGradient id="paint10_linear_1_1434" x1="29.4001" y1="2.1001" x2="24.3001" y2="17.1001" gradientUnits="userSpaceOnUse">
					<stop stopColor="#C6A152" />
					<stop offset="0.265" stopColor="#C8A354" />
					<stop offset="0.52" stopColor="#E1C97D" />
					<stop offset="0.765" stopColor="#B79046" />
					<stop offset="1" stopColor="#D6B968" />
				</linearGradient>
				<linearGradient id="paint11_linear_1_1434" x1="32.9019" y1="27.6973" x2="32.9019" y2="52.4336" gradientUnits="userSpaceOnUse">
					<stop stopColor="#C6A152" />
					<stop offset="0.265" stopColor="#C8A354" />
					<stop offset="0.52" stopColor="#E1C97D" />
					<stop offset="0.765" stopColor="#B79046" />
					<stop offset="1" stopColor="#D6B968" />
				</linearGradient>
				<linearGradient id="paint12_linear_1_1434" x1="10.5001" y1="46.2" x2="15.1866" y2="59.5222" gradientUnits="userSpaceOnUse">
					<stop stopColor="#B1A17F" />
					<stop offset="0.265" stopColor="#C8A354" />
					<stop offset="0.52" stopColor="#E1C97D" />
					<stop offset="0.725" stopColor="#B79046" />
					<stop offset="1" stopColor="#B79046" />
				</linearGradient>
				<linearGradient id="paint13_linear_1_1434" x1="20.6196" y1="8.87656" x2="17.5565" y2="11.4256" gradientUnits="userSpaceOnUse">
					<stop offset="0.00558659" stopColor="white" />
					<stop offset="0.1508" stopColor="white" />
					<stop offset="1" stopColor="white" />
				</linearGradient>
				<linearGradient id="paint14_linear_1_1434" x1="33.401" y1="25.839" x2="30.6281" y2="28.1465" gradientUnits="userSpaceOnUse">
					<stop offset="0.00558659" stopColor="white" />
					<stop offset="0.1508" stopColor="white" />
					<stop offset="1" stopColor="white" />
				</linearGradient>
				<linearGradient id="paint15_linear_1_1434" x1="29.5111" y1="10.0206" x2="24.7606" y2="10.3918" gradientUnits="userSpaceOnUse">
					<stop offset="0.00558659" stopColor="white" />
					<stop offset="0.1508" stopColor="white" />
					<stop offset="1" stopColor="white" />
				</linearGradient>
				<linearGradient id="paint16_linear_1_1434" x1="22.7861" y1="40.1474" x2="11.3567" y2="50.295" gradientUnits="userSpaceOnUse">
					<stop offset="0.2039" />
					<stop offset="0.235" stopColor="#222222" />
					<stop offset="0.2829" stopColor="#505050" />
					<stop offset="0.3352" stopColor="#7A7A7A" />
					<stop offset="0.391" stopColor="#9E9E9E" />
					<stop offset="0.451" stopColor="#BCBCBC" />
					<stop offset="0.5166" stopColor="#D5D5D5" />
					<stop offset="0.5901" stopColor="#E8E8E8" />
					<stop offset="0.676" stopColor="#F5F5F5" />
					<stop offset="0.7855" stopColor="#FDFDFD" />
					<stop offset="1" stopColor="white" />
				</linearGradient>
				<linearGradient id="paint17_linear_1_1434" x1="19.5696" y1="46.4957" x2="11.6514" y2="53.5258" gradientUnits="userSpaceOnUse">
					<stop offset="0.2039" />
					<stop offset="0.235" stopColor="#222222" />
					<stop offset="0.2829" stopColor="#505050" />
					<stop offset="0.3352" stopColor="#7A7A7A" />
					<stop offset="0.391" stopColor="#9E9E9E" />
					<stop offset="0.451" stopColor="#BCBCBC" />
					<stop offset="0.5166" stopColor="#D5D5D5" />
					<stop offset="0.5901" stopColor="#E8E8E8" />
					<stop offset="0.676" stopColor="#F5F5F5" />
					<stop offset="0.7855" stopColor="#FDFDFD" />
					<stop offset="1" stopColor="white" />
				</linearGradient>
				<linearGradient id="paint18_linear_1_1434" x1="22.9698" y1="34.9177" x2="8.81104" y2="47.6088" gradientUnits="userSpaceOnUse">
					<stop offset="0.2039" />
					<stop offset="0.235" stopColor="#222222" />
					<stop offset="0.2829" stopColor="#505050" />
					<stop offset="0.3352" stopColor="#7A7A7A" />
					<stop offset="0.391" stopColor="#9E9E9E" />
					<stop offset="0.451" stopColor="#BCBCBC" />
					<stop offset="0.5166" stopColor="#D5D5D5" />
					<stop offset="0.5901" stopColor="#E8E8E8" />
					<stop offset="0.676" stopColor="#F5F5F5" />
					<stop offset="0.7855" stopColor="#FDFDFD" />
					<stop offset="1" stopColor="white" />
				</linearGradient>
				<linearGradient id="paint19_linear_1_1434" x1="24.2799" y1="31.3773" x2="14.536" y2="40.0504" gradientUnits="userSpaceOnUse">
					<stop offset="0.2039" />
					<stop offset="0.235" stopColor="#222222" />
					<stop offset="0.2829" stopColor="#505050" />
					<stop offset="0.3352" stopColor="#7A7A7A" />
					<stop offset="0.391" stopColor="#9E9E9E" />
					<stop offset="0.451" stopColor="#BCBCBC" />
					<stop offset="0.5166" stopColor="#D5D5D5" />
					<stop offset="0.5901" stopColor="#E8E8E8" />
					<stop offset="0.676" stopColor="#F5F5F5" />
					<stop offset="0.7855" stopColor="#FDFDFD" />
					<stop offset="1" stopColor="white" />
				</linearGradient>
				<linearGradient id="paint20_linear_1_1434" x1="28.2294" y1="29.0754" x2="22.1231" y2="34.7028" gradientUnits="userSpaceOnUse">
					<stop offset="0.2039" />
					<stop offset="0.235" stopColor="#222222" />
					<stop offset="0.2829" stopColor="#505050" />
					<stop offset="0.3352" stopColor="#7A7A7A" />
					<stop offset="0.391" stopColor="#9E9E9E" />
					<stop offset="0.451" stopColor="#BCBCBC" />
					<stop offset="0.5166" stopColor="#D5D5D5" />
					<stop offset="0.5901" stopColor="#E8E8E8" />
					<stop offset="0.676" stopColor="#F5F5F5" />
					<stop offset="0.7855" stopColor="#FDFDFD" />
					<stop offset="1" stopColor="white" />
				</linearGradient>
				<linearGradient id="paint21_linear_1_1434" x1="35.0088" y1="38.1275" x2="26.0996" y2="45.5414" gradientUnits="userSpaceOnUse">
					<stop offset="0.00558659" stopColor="white" />
					<stop offset="0.1508" stopColor="white" />
					<stop offset="1" stopColor="white" />
					<stop offset="1" stopColor="white" />
				</linearGradient>
				<clipPath id="clip0_1_1434">
					<rect width="46.295" height="60" fill="white" />
				</clipPath>
				<clipPath id="clip1_1_1434">
					<rect width="46.295" height="60" fill="white" />
				</clipPath>
			</defs>
		</motion.svg>
	);
};

export default CrystalAnimation1;
