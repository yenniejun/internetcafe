import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import {Meeple1, Meeple2, Meeple3, Meeple4, Meeple5, Meeple6}  from "./../components/cafe-elements/avatars"

// Show two avatars if it's the main/first screen (the one with laptop)
// Show three if it's every other screen
function calculateAvatarTransformation(index, showTwo) {
	if (showTwo) {
		return index*800+200
	} else {
		return index*400+200
	}
}

const CafeBackground = (props) => {

	// console.log("Cafe Background", props.friends)

  if (!props.width || !props.height) {
	return null;
  }

  var viewBox = [0, 0, 1440, 1024].join(' ')

  return (
    <div className="cafe-background-svg">
      <svg width={props.width} height={props.height} viewBox={viewBox} preserveAspectRatio="xMidYMid meet" fill="none" xmlns="http://www.w3.org/2000/svg">
		<g className="tabletop" clipPath="url(#clip0)">
			<rect className="wall" width="1440" height="1024" fill="url(#paint0_linear)"/>
			<rect x="104" y="75" width="251" height="520" rx="15" fill="#A4A9AD"/>
			<rect x="112" y="82" width="235" height="501" rx="11" fill="#C9E6FF"/>
			<path d="M228.77 82H247L112 489V429L228.77 82Z" fill="#B6DDFF"/>
			<path d="M130.5 82H145.5L112 173V134.5L130.5 82Z" fill="#B6DDFF"/>
			<path d="M134 345C134 342.239 136.239 340 139 340H347V350H139C136.239 350 134 347.761 134 345V345Z" fill="#A4A9AD"/>
			<path className="doorhandle" d="M141 345C141 343.895 141.895 343 143 343H345V347H143C141.895 347 141 346.105 141 345V345Z" fill="#C4C4C4"/>
			<rect className="floor" y="569" width="1440" height="455" fill="#FCE9C3"/>
			<path className="window-pane" d="M1318 88C1318 85.7909 1319.79 84 1322 84H1473V481H1318V88Z" fill="#C9E6FF"/>
			<rect className="window-border" x="1318" y="472" width="155" height="9" fill="#C4C4C4"/>
			<path className="window-border" d="M1318 87C1318 85.3431 1319.34 84 1321 84V84V481H1318V87Z" fill="#C4C4C4"/>
			<path className="window-line" d="M1440 392V420.851L1410.5 471.844H1392L1440 392Z" fill="#B6DDFF"/>
			<path className="window-line" d="M1439 242V270.851L1318 468.156V441.5L1439 242Z" fill="#B6DDFF"/>
			<path id="counter-border" d="M1415 345H382V594C382 596.761 384.239 599 387 599H1410C1412.76 599 1415 596.761 1415 594V345Z" fill="#C69C6D"/>
			<path d="M424 401C424 392.163 431.163 385 440 385H1357C1365.84 385 1373 392.163 1373 401V543C1373 551.837 1365.84 559 1357 559H440C431.163 559 424 551.837 424 543V401Z" fill="#FCE9C3"/>
			<path d="M375 339C375 335.686 377.686 333 381 333H1418C1421.31 333 1424 335.686 1424 339V339C1424 342.314 1421.31 345 1418 345H381C377.686 345 375 342.314 375 339V339Z" fill="white"/>
			<path d="M1.55444 547.417H251.041V553.5H1.55444V547.417Z" fill="#975B00"/>
			<path opacity="0.15" d="M1.55444 547.417H251.041V553.5H1.55444V547.417Z" fill="black"/>
			<path d="M1.55444 530L270.446 530.276L251.041 547.418L1.55444 547.141V530Z" fill="#603A02"/>
			<path d="M1.55444 530L270.446 530.276L251.041 547.418L1.55444 547.141V530Z" fill="#975B00"/>
			<path d="M251.041 547.694L271 530.276V534.976L251.041 553.223V547.694Z" fill="#975B00"/>
			<path opacity="0.1" d="M251.041 547.694L271 530.276V534.976L251.041 553.223V547.694Z" fill="black"/>
			<path d="M251.041 547.418L271 530M251.041 547.418H1M251.041 547.418V553.5M271 530H1V538.709V547.418M271 530V534.976L251.041 553.5M1 547.418V553.5H251.041" stroke="#603A02" strokeLinecap="round" strokeLinejoin="round"/>
			<path d="M50 661H153.5C127.348 648.071 113.353 619.001 119.557 590.494L127.5 554H78L84.2946 592.217C88.8939 620.142 75.0696 647.868 50 661Z" fill="#472B01" stroke="#603A02"/>
			
			{!!props.cafe && 
				<Fragment>
					<text x="700" y="480" fontFamily="Open Sans" fontSize="36" fill="black" > 
				        {props.cafe.cafename }
				    </text>	

					<text x="700" y="510" fontFamily="Open Sans" fontSize="1.5rem" fill="black" > 
				        {props.cafe.location}
				    </text>	
			    </Fragment>
			}

			<rect x="0.517914" y="646.047" width="168.837" height="5.95294" fill="#975B00"/>
			<rect opacity="0.15" x="0.517914" y="646.047" width="168.837" height="5.95294" fill="black"/>
			<path d="M0.517914 629.271H187.482L169.355 646.047H0.517914V629.271Z" fill="#603A02"/>
			<path d="M0.517914 629.271H187.482L169.355 646.047H0.517914V629.271Z" fill="#975B00"/>
			<path d="M169.355 646.318L188 629.271V633.871L169.355 651.729V646.318Z" fill="#975B00"/>
			<path opacity="0.1" d="M169.355 646.318L188 629.271V633.871L169.355 651.729V646.318Z" fill="black"/>
			<path d="M169.355 646.047L188 629M169.355 646.047H0M169.355 646.047V652M188 629H0V646.047M188 629V633.871L169.355 652M0 646.047V652H169.355" stroke="#603A02" strokeLinecap="round" strokeLinejoin="round"/>
			<path d="M-40 759H63.5C37.3478 746.071 23.3528 717.001 29.5571 688.494L37.5 652H-12L-5.70539 690.217C-1.10608 718.142 -14.9304 745.868 -40 759Z" fill="#472B01" stroke="#603A02" strokeLinejoin="round"/>
			<path d="M1438.45 547.417H1188.96V553.5H1438.45V547.417Z" fill="#975B00"/>
			<path opacity="0.15" d="M1438.45 547.417H1188.96V553.5H1438.45V547.417Z" fill="black"/>
			<path d="M1438.45 530L1169.55 530.276L1188.96 547.418L1438.45 547.141V530Z" fill="#603A02"/>
			<path d="M1438.45 530L1169.55 530.276L1188.96 547.418L1438.45 547.141V530Z" fill="#975B00"/>
			<path d="M1188.96 547.694L1169 530.276V534.976L1188.96 553.223V547.694Z" fill="#975B00"/>
			<path opacity="0.1" d="M1188.96 547.694L1169 530.276V534.976L1188.96 553.223V547.694Z" fill="black"/>
			<path d="M1188.96 547.418L1169 530M1188.96 547.418H1439M1188.96 547.418V553.5M1169 530H1439V538.709V547.418M1169 530V534.976L1188.96 553.5M1439 547.418V553.5H1188.96" stroke="#603A02" strokeLinecap="round" strokeLinejoin="round"/>
			<path d="M1390 661H1287C1313.04 648.063 1326.97 619.092 1320.82 590.672L1312.87 554H1362.14L1355.84 592.389C1351.28 620.226 1365.04 647.861 1390 661Z" fill="#472B01" stroke="#603A02"/>
			<rect width="168.837" height="5.95294" transform="matrix(-1 0 0 1 1439.48 646.047)" fill="#975B00"/>
			<rect opacity="0.15" width="168.837" height="5.95294" transform="matrix(-1 0 0 1 1439.48 646.047)" fill="black"/>
			<path d="M1439.48 629.271H1252.52L1270.64 646.047H1439.48V629.271Z" fill="#603A02"/>
			<path d="M1439.48 629.271H1252.52L1270.64 646.047H1439.48V629.271Z" fill="#975B00"/>
			<path d="M1270.64 646.318L1252 629.271V633.871L1270.64 651.729V646.318Z" fill="#975B00"/>
			<path opacity="0.1" d="M1270.64 646.318L1252 629.271V633.871L1270.64 651.729V646.318Z" fill="black"/>
			<path d="M1270.64 646.047L1252 629M1270.64 646.047H1440M1270.64 646.047V652M1252 629H1440V646.047M1252 629V633.871L1270.64 652M1440 646.047V652H1270.64" stroke="#603A02" strokeLinecap="round" strokeLinejoin="round"/>
			<path d="M1475.5 759H1372C1398.15 746.071 1412.15 717.001 1405.94 688.494L1398 652H1447.5L1441.21 690.217C1436.61 718.142 1450.43 745.868 1475.5 759Z" fill="#472B01" stroke="#603A02"/>
			
			{
				!!props.cafe && 
				<path className="mydesk" d="M82.024 902.266L0 1029H1440L1357.98 902.266C1350.6 890.877 1337.96 884 1324.4 884H115.604C102.038 884 89.3954 890.877 82.024 902.266Z" fill="#975B00" stroke="#603A02" strokeWidth="9"/>
			}

			{
				!!props.food && 
				<Fragment>
					<rect x="413" y="318" width="349" height="15" fill="#C69C6D"/>
					{props.food.map((item, index) => item)}
				</Fragment>
			}
			
			<g className="foodglass" opacity="0.5">
				<path d="M453.77 220H825.913C859.826 220 889.458 242.907 898 275.726V333H382V275.726C390.385 242.937 419.926 220 453.77 220Z" fill="#C9E6FF"/>
				<path d="M453.77 220H825.913C859.826 220 889.458 242.907 898 275.726V333H382V275.726C390.385 242.937 419.926 220 453.77 220Z" fill="url(#paint1_linear)"/>
			</g>

			{!!props.behindLightbulb &&
				props.behindLightbulb.map((item, index) => item)
			}

			<path d="M553 127C553 124.791 554.791 123 557 123H1298C1300.21 123 1302 124.791 1302 127V127C1302 129.209 1300.21 131 1298 131H557C554.791 131 553 129.209 553 127V127Z" fill="#C69C6D"/>
			<path d="M617 131H628L626 140H619L617 131Z" fill="#6D5C41"/>
			<path d="M1230 131H1241L1239 140H1232L1230 131Z" fill="#6D5C41"/>
			<g clipPath="url(#clip1)">
				<path d="M1126.5 14.1206V133.414" stroke="#556080" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
				<path d="M1158.74 14.1206V101.172" stroke="#556080" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
				<path d="M1094.26 14.1206V68.9309" stroke="#556080" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
				<path d="M1168.41 1.22412H1084.59V14.1207H1168.41V1.22412Z" fill="#556080"/>
				<path d="M1071.69 1.22412H1181.31" stroke="#38454F" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
				<path d="M1100.71 68.9312H1087.81V81.8277H1100.71V68.9312Z" fill="#7383BF"/>
				<path d="M1132.95 133.414H1120.05V146.31H1132.95V133.414Z" fill="#7383BF"/>
				<path d="M1165.19 101.172H1152.29V114.069H1165.19V101.172Z" fill="#7383BF"/>
				<path d="M1100.71 89.6365V81.8276H1087.81V89.6365C1082.12 92.1255 1078.14 97.7903 1078.14 104.397C1078.14 113.298 1085.36 120.517 1094.26 120.517C1103.16 120.517 1110.38 113.298 1110.38 104.397C1110.38 97.7903 1106.39 92.1255 1100.71 89.6365Z" fill="#ED8A19"/>
				<path d="M1132.95 154.119V146.31H1120.05V154.119C1114.36 156.608 1110.38 162.273 1110.38 168.879C1110.38 177.781 1117.6 185 1126.5 185C1135.4 185 1142.62 177.781 1142.62 168.879C1142.62 162.273 1138.64 156.608 1132.95 154.119Z" fill="#ED8A19"/>
				<path d="M1165.19 121.878V114.069H1152.29V121.878C1146.61 124.367 1142.62 130.032 1142.62 136.638C1142.62 145.54 1149.84 152.759 1158.74 152.759C1167.64 152.759 1174.86 145.54 1174.86 136.638C1174.86 130.032 1170.88 124.367 1165.19 121.878Z" fill="#ED8A19"/>
				<path className="lightbulb" d="M1097.48 101.172V94.7241C1097.48 92.9412 1096.04 91.5 1094.26 91.5C1092.48 91.5 1091.03 92.9412 1091.03 94.7241V101.172C1089.25 101.172 1087.81 102.614 1087.81 104.397C1087.81 106.179 1089.25 107.621 1091.03 107.621H1097.48C1099.27 107.621 1100.71 106.179 1100.71 104.397C1100.71 102.614 1099.27 101.172 1097.48 101.172Z" fill="#EFCE4A"/>
				<path className="lightbulb" d="M1161.97 133.414V126.966C1161.97 125.183 1160.52 123.741 1158.74 123.741C1156.96 123.741 1155.52 125.183 1155.52 126.966V133.414C1153.73 133.414 1152.29 134.855 1152.29 136.638C1152.29 138.421 1153.73 139.862 1155.52 139.862H1161.97C1163.75 139.862 1165.19 138.421 1165.19 136.638C1165.19 134.855 1163.75 133.414 1161.97 133.414Z" fill="#EFCE4A"/>
				<path className="lightbulb" d="M1129.72 165.655V159.207C1129.72 157.424 1128.28 155.983 1126.5 155.983C1124.72 155.983 1123.28 157.424 1123.28 159.207V165.655C1121.49 165.655 1120.05 167.096 1120.05 168.879C1120.05 170.662 1121.49 172.103 1123.28 172.103H1129.72C1131.51 172.103 1132.95 170.662 1132.95 168.879C1132.95 167.096 1131.51 165.655 1129.72 165.655Z" fill="#EFCE4A"/>
			</g>
			<path d="M0 84H53C56.866 84 60 87.134 60 91V477C60 479.209 58.2091 481 56 481H0V84Z" fill="#C9E6FF"/>
			<path d="M60 256V284.851L0 416.5V389.844L60 256Z" fill="#B6DDFF"/>
			<path d="M60 110V138.851L0 270.5V243.844L60 110Z" fill="#B6DDFF"/>
			<path d="M-23 472H60V477.408C60 479.617 58.2091 481.408 56 481.408H-23V472Z" fill="#C4C4C4"/>

			{
				!!props.handleLogout && 
					<Link 
			      	to={{
			            pathname: './list',
			            state: {
						  username: props.username,
						  avatar: props.avatar
			            }
			          }} 
			          onClick={props.handleLogout}>
	          			<path className="cafe-exit-sign" d="M210.265 85.3949L212.691 87.8208L229.105 71.4071L226.679 68.9812L210.265 85.3949Z" fill="#666666"/>
						<path className="cafe-exit-sign" d="M230.031 71.4074L246.444 87.821L248.87 85.3952L232.457 68.9815L230.031 71.4074Z" fill="#666666"/>
						<path className="cafe-exit-sign" d="M229.501 73.7454C231.904 73.7454 233.853 71.7967 233.853 69.3928C233.853 66.989 231.904 65.0403 229.501 65.0403C227.097 65.0403 225.148 66.989 225.148 69.3928C225.148 71.7967 227.097 73.7454 229.501 73.7454Z" fill="#F7B239"/>
						<path id="cafe-exit-sign-main" className="cafe-exit-sign" d="M272.037 127.96H186.963C184.222 127.96 182 125.737 182 122.997V90.6451C182 87.9042 184.222 85.6821 186.963 85.6821H272.037C274.778 85.6821 277 87.9041 277 90.6451V122.997C277 125.737 274.778 127.96 272.037 127.96Z" fill="#9AD14B"/>
						<path d="M238.209 96.9719C237.262 96.9719 236.494 97.7399 236.494 98.6873V114.954C236.494 115.902 237.262 116.67 238.209 116.67C239.156 116.67 239.924 115.902 239.924 114.954V98.6873C239.924 97.7399 239.156 96.9719 238.209 96.9719Z" fill="#F2F2F2"/>
						<path d="M229.677 97.2654C228.892 96.7355 227.826 96.9423 227.296 97.7276L223.229 103.754L219.161 97.7276C218.631 96.942 217.565 96.7351 216.78 97.2654C215.994 97.7953 215.788 98.8616 216.318 99.6469L221.159 106.821L216.318 113.995C215.788 114.78 215.995 115.846 216.78 116.376C217.074 116.575 217.408 116.67 217.738 116.67C218.289 116.67 218.83 116.405 219.161 115.914L223.228 109.887L227.296 115.914C227.627 116.405 228.168 116.67 228.719 116.67C229.049 116.67 229.383 116.575 229.677 116.376C230.462 115.846 230.669 114.78 230.139 113.995L225.298 106.821L230.139 99.6469C230.669 98.8616 230.463 97.7953 229.677 97.2654Z" fill="#F2F2F2"/>
						<path d="M210.886 100.403C211.833 100.403 212.601 99.6352 212.601 98.6878C212.601 97.7404 211.833 96.9724 210.886 96.9724H201.265C200.318 96.9724 199.55 97.7404 199.55 98.6878V114.955C199.55 115.902 200.318 116.67 201.265 116.67H210.886C211.833 116.67 212.601 115.902 212.601 114.955C212.601 114.007 211.833 113.239 210.886 113.239H202.981V108.712H206.075C207.023 108.712 207.791 107.944 207.791 106.996C207.791 106.049 207.023 105.281 206.075 105.281H202.981V100.403H210.886V100.403Z" fill="#F2F2F2"/>
						<path d="M257.735 96.9719H245.899C244.951 96.9719 244.183 97.7399 244.183 98.6873C244.183 99.6347 244.951 100.403 245.899 100.403H250.101V114.954C250.101 115.902 250.869 116.67 251.817 116.67C252.764 116.67 253.532 115.902 253.532 114.954V100.403H257.735C258.682 100.403 259.45 99.6347 259.45 98.6873C259.45 97.7399 258.682 96.9719 257.735 96.9719Z" fill="#F2F2F2"/>
					</Link>
			}

			{!!props.extra && props.extra.map((item, index) => item)}

			{
				!!props.friends &&
					props.friends.map((item, index) => {
						return (
							<Fragment key={"avatar"+item['avatar'] + Math.random()}>
							{item['avatar'] === "Meeple1" && <Meeple1 transform={calculateAvatarTransformation(index, !!props.cafe)} username={item['username']}/>}
							{item['avatar'] === "Meeple2" && <Meeple2 transform={calculateAvatarTransformation(index, !!props.cafe)} username={item['username']}/>}
							{item['avatar'] === "Meeple3" && <Meeple3 transform={calculateAvatarTransformation(index, !!props.cafe)} username={item['username']}/>}
							{item['avatar'] === "Meeple4" && <Meeple4 transform={calculateAvatarTransformation(index, !!props.cafe)} username={item['username']}/>}
							{item['avatar'] === "Meeple5" && <Meeple5 transform={calculateAvatarTransformation(index, !!props.cafe)} username={item['username']}/>}
							{item['avatar'] === "Meeple6" && <Meeple6 transform={calculateAvatarTransformation(index, !!props.cafe)} username={item['username']}/>}
							</Fragment>
						)
					}
				)
			}	

			</g>
			<defs>
				<linearGradient id="paint0_linear" x1="720" y1="0" x2="720" y2="1024" gradientUnits="userSpaceOnUse">
					<stop stopColor="#C69C6D"/>
					<stop offset="1" stopColor="white" stopOpacity="0"/>
				</linearGradient>
				<linearGradient id="paint1_linear" x1="636.044" y1="220" x2="636.044" y2="333" gradientUnits="userSpaceOnUse">
					<stop stopColor="white"/>
					<stop offset="1" stopColor="white" stopOpacity="0"/>
				</linearGradient>
				<clipPath id="clip0">
					<rect width="1440" height="1024" fill="white"/>
				</clipPath>
				<clipPath id="clip1">
					<rect x="1033" y="-2" width="187" height="187" fill="white"/>
				</clipPath>
			</defs>
		</svg>
    </div>
  );
}
export default CafeBackground;

