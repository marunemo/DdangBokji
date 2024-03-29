import img_private from '../Assets/private.png';
import img_private_first_class from '../Assets/private-first-class.png';
import img_corporal from '../Assets/corporal.png';
import img_sergeant from '../Assets/sergeant.png';

const shopItemList = [
	{
		name: '이병 약장',
		desc: '자신의 뱃지에 이병 약장을 추가합니다.',
		image: img_private,
		itemCode: '이병',
		price: 10
	},
	{
		name: '일병 약장',
		desc: '자신의 뱃지에 일병 약장을 추가합니다.',
		image: img_private_first_class,
		itemCode: '일병',
		price: 30
	},
	{
		name: '상병 약장',
		desc: '자신의 뱃지에 상병 약장을 추가합니다.',
		image: img_corporal,
		itemCode: '상병',
		price: 50
	},
	{
		name: '병장 약장',
		desc: '자신의 뱃지에 병장 약장을 추가합니다.',
		image: img_sergeant,
		itemCode: '병장',
		price: 70
	},
	{
		name: '야놀자 숙박 할인권',
		desc: '야놀자 숙박 할인권 10,000원',
		image: 'https://yanolja.in/static/share/share_thumb_1200x630.jpg',
		itemCode: '야놀자',
		price: 50000
	},
	{
		name: '여기어때 숙박 할인권',
		desc: '여기어때 30% 할인 쿠폰',
		image: 'https://image.goodchoice.kr/images/web_v3/h1_logo_mo_share.png',
		itemCode: '여기어때',
		price: 50000
	}
];

export default shopItemList;