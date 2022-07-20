import img_private from '../Assets/private.png';
import img_private_first_class from '../Assets/private-first-class.png';
import img_corporal from '../Assets/corporal.png';
import img_sergeant from '../Assets/sergeant.png';

const badgeMap = {
	'none': {
		title: '없음',
		image: null
	},
	'이병': {
		title: '이병',
		image: img_private
	},
	'일병': {
		title: '일병',
		image: img_private_first_class
	},
	'상병': {
		title: '상병',
		image: img_corporal
	},
	'병장': {
		title: '병장',
		image: img_sergeant
	}
}

export default badgeMap;