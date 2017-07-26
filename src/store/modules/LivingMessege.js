import {
	INPUT_LIVING_MESSEGE,
	LIVING_MESSEGE_POST,
	CLEAN_DATA,
	REPLY_MESSEGE_INFO,
	REPLY_MESSEGE_POST
} from '../actionTypes';
import {Message} from 'element-ui';
import {leavingMessageApi} from '../../api';

const LivingMessege = {
	state: {
		messege: '',
		activeId: '',
		contentList: [
			{
				id: 10003,
				name: '阿明',
				imgUrl: '',
				messege: '换不厌的春秋和一个等不到的人，错乱我的四季。 每段旅程都会有一个你爱的人，就像双手不会主动拒绝温暖的十指紧扣。',
				dateTime: '2017-7-13 23：45',
				content: [
					{
						id: 10004,
						name: '小红',
						imgUrl: '',
						messege: '换不厌的春秋和一个等不到的人，错乱我的四季。 每段旅程都会有一个你爱的人，就像双手不会主动拒绝温暖的十指紧扣。',
						dateTime: '2017-12-13 23：49',
					},
					{
						id: 10009,
						name: '阿敏',
						imgUrl: '',
						messege: '换不厌的春秋和一个等不到的人，错乱我的四季。 每段旅程都会有一个你爱的人，就像双手不会主动拒绝温暖的十指紧扣。',
						dateTime: '2017-6-13 23：55',
					}
				]
			},
			{
				id: 10003,
				name: '阿明',
				imgUrl: '',
				messege: '换不厌的春秋和一个等不到的人，错乱我的四季。 每段旅程都会有一个你爱的人，就像双手不会主动拒绝温暖的十指紧扣。',
				dateTime: '2017-6-13 23：45',
				content: [
					{
						id: 10004,
						name: '小红',
						imgUrl: '',
						messege: '换不厌的春秋和一个等不到的人，错乱我的四季。 每段旅程都会有一个你爱的人，就像双手不会主动拒绝温暖的十指紧扣。',
						dateTime: '2017-6-13 23：49',
					},
					{
						id: 10009,
						name: '阿敏',
						imgUrl: '',
						messege: '换不厌的春秋和一个等不到的人，错乱我的四季。 每段旅程都会有一个你爱的人，就像双手不会主动拒绝温暖的十指紧扣。',
						dateTime: '2017-6-13 23：55',
					}
				]
			}
		]
	},
	mutations: {
		[INPUT_LIVING_MESSEGE](state, event){
			state.messege = event.target.value;
		},
		[CLEAN_DATA](state, {moudle, data}){
			state[moudle] = data;
		},
		[REPLY_MESSEGE_INFO](state, id) {
			console.log(id);
			state.activeId = id;
		}
	},
	actions: {
		[LIVING_MESSEGE_POST]({state, commit, rootState}, value){
			console.log(rootState.NavHeader.userInfo.user_name);
			console.log(state.messege, state.messege === '');
			if (state.messege === '') {
				Message({
					showClose: false,
					message: '内容不能为空！',
					type: 'error'
				});
			} else if (state.messege.length > 200) {
				Message({
					showClose: false,
					message: '内容不能超过200个字符！',
					type: 'error'
				});
			} else {
				leavingMessageApi({name: rootState.NavHeader.userInfo.user_name, message: state.message}).then((response) => {
					Message({
						showClose: false,
						message: '留言成功，谢谢！',
						type: 'success'
					});
					commit('TOGGLE_POPUP', {popupShow: false});
					commit('CLEAN_DATA', {moudle: 'messege', data: ''});
				}).catch((err) => {
					Message({
						showClose: false,
						message: err.response.data.messege,
						type: 'error'
					});
				})
			}
		},
		[REPLY_MESSEGE_POST]({state, commit, rootState}, {parentId, beAnswered}){
			console.log(rootState.NavHeader.userInfo.user_name);
			console.log(state.messege, state.messege === '');
			console.log(parentId, beAnswered);
			if (state.messege === '') {
				Message({
					showClose: false,
					message: '内容不能为空！',
					type: 'error'
				});
			} else if (state.messege.length > 200) {
				Message({
					showClose: false,
					message: '内容不能超过200个字符！',
					type: 'error'
				});
			} else {
				leavingMessageApi({name: rootState.NavHeader.userInfo.user_name, message: state.message}).then((response) => {
					Message({
						showClose: false,
						message: '留言成功，谢谢！',
						type: 'success'
					});
					let newArr = [];
					state.contentList.forEach((item) => {
						if (item.id === parentId) {
							item.content.push(
							{
								id: 10009,
								name: '阿敏',
								imgUrl: '',
								messege: state.messege,
								dateTime: '2017-6-13 23：55',
							}
							);
						}
						newArr = [...newArr, item]
					});
					commit('CLEAN_DATA', {moudle: 'contentList', data: newArr});
					commit('CLEAN_DATA', {moudle: 'messege', data: ''});
					commit('CLEAN_DATA', {moudle: 'activeId', data: ''});
				}).catch((err) => {
					Message({
						showClose: false,
						message: err.response.data.messege,
						type: 'error'
					});
				})
			}
		},
	}
};

export default LivingMessege;