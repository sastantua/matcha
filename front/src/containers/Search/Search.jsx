import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { styled as styledMaterial } from '@material-ui/core/styles';
import usePosition from '../../hooks/usePosition'
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

import { Typography, Button } from '@material-ui/core'

import api from '../../api/api'
import SearchRequestContext from '../../context/SearchRequestContext';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

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

const MainContainer = styled.div`
	display: flex;
	flex: auto;
	flex-direction: column;
	align-items: center;
	width: auto;
	min-height: 88vh;
	margin-top: 10vh;
	margin-bottom: 8vh;
	background-image: linear-gradient(90deg, #FF655B 30%, #FF5864 90%);
`

const TextWrapper = styledMaterial(Typography)({
	fontSize: '1.5rem',
	color: "#FFF",
	marginTop: '3vh',
	marginBottom: '4vh',
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

	if (!isLoading) {
		return (
			<>
					<MainContainer>
						<TextWrapper>Select your preferences</TextWrapper>
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
			</>
		);
	}
	else
		return (<Loader/>);
}

export default Search;