import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { styled as styledMaterial } from '@material-ui/core/styles';

import { COLORS } from '../../config/style'
import usePosition from '../../hooks/usePosition'

import api from '../../api/api'
import SearchRequestContext from '../../context/SearchRequestContext';

import SortBy from './SortBy/SortBy';
import OrderCheckbox from './OrderCheckbox/OrderCheckbox';
import Age from './Age/Age';
import Hobby from './Hobby/Hobby';
import Popularity from './Popularity/Popularity';
import Distance from './Distance/Distance';
import Result from './Result/Result';

import Loader from '../../components/Loader/Loader'

import sortAge from './Helper/sortAge.js'
import sortHobby from './Helper/sortHobby.js'
import sortProximity from './Helper/sortProximity.js'
import sortPopularity from './Helper/sortPopularity.js'

import { Typography, Button } from '@material-ui/core'

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	overflow: scroll;
	min-height: 100vh;
	color: "#000";
	background-color: ${COLORS.GREEN};
`

const SearchTitle = styledMaterial(Typography)({
	fontSize: '1.5rem',
	color: "#FFF",
});

const ButtonWrapper = styledMaterial(Button)({
	marginTop: '3vh',
	marginBottom: '3vh',
});

const sortUsers = (users, userPosition, userHobbies, sort, ascending, descending) => {
	if (sort !== undefined && ascending !== undefined && descending !== undefined) {
		if (sort === "age")
			return (users.sort((a, b) => sortAge(ascending, descending, a, b)));
		else if (sort === "popularity")
			return (users.sort((a, b) => sortPopularity(ascending, descending, a, b)));
		else if (sort === "proximity")
			return (users.sort((a, b) => sortProximity(userPosition, ascending, descending, a, b)));
		else if (sort === "hobby")
			return (users.sort((a, b) => sortHobby(userHobbies, a, b)));
	}
}

function Search() {
	// const { user, setUser } = useContext(UserContext);
	const [sort, setSort] = useState("age");
	const [ascending, setAscending] = useState(true);
	const [descending, setDescending] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [result, setResult] = useState([]);
	const [request, setRequest] = useState({
		distance: 5,
		age: {
			min: 18,
			max: 50
		},
		popularity: {
			min: 20,
			max: 80
		},
		hobbies: []
	});

	const [userHobbies, setUserHobbies] = useState();
	const userPosition = usePosition();

	useEffect(() => {
		api.get('/user/hobby')
		.then((res) => {setUserHobbies(res.data)})
		.catch((err) => {console.log(err)})
	}, []);

	useEffect(() => {
		setResult(sortUsers(result, userPosition, userHobbies, sort, ascending, descending));
	}, [sort, ascending, descending])

	const handleSubmit = () => {
		setIsLoading(true);
		api.get('/user/search', request)
		.then((res) => {
			setResult(sortUsers(res.data, userPosition, userHobbies, sort, ascending, descending))
			setIsLoading(false);
		})
		.catch((err) => {
			console.error(err);
			setIsLoading(false);
		})
	}

		return (
			!isLoading ? 
			<MainContainer>
				<SearchTitle>Select your preferences</SearchTitle>
				<SortBy setSort={setSort}/>
				<OrderCheckbox descending={descending} ascending={ascending} setDescending={setDescending} setAscending={setAscending}/>
				<SearchRequestContext.Provider value={[request, setRequest]}>
					<Distance/>
					<Age/>
					<Popularity/>
					<Hobby/>
					<ButtonWrapper onClick={handleSubmit}>Search</ButtonWrapper>
				</SearchRequestContext.Provider>
				<Result result={result} sort={sort} descending={descending} ascending={ascending}/>
			</MainContainer>
			: <Loader/>
		);
}

export default Search;