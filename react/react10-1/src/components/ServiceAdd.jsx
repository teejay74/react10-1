import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {changeServiceField, addService, clearService} from '../actions/actionCreators';

function ServiceAdd() {
	const item = useSelector(state => state.serviceAdd);
	const dispatch = useDispatch();

	const handleChange = evt => {
		const {name, value} = evt.target;
		dispatch(changeServiceField(name, value));
	}

	const handleSubmit = evt => {
			evt.preventDefault();
			dispatch(addService(item.name, item.price));
	}

	const handleClear = (evt) => {
		evt.preventDefault();
		dispatch(clearService())
	}

	return (
		<form onSubmit={handleSubmit}>
			<input name='name' onChange={handleChange} value={item.name} />
			<input name='price' onChange={handleChange} value={item.price} />
			<button type='submit'>Save</button>
			<button onClick={handleClear}>Cancel</button>
		</form>
	);
}

export default ServiceAdd;