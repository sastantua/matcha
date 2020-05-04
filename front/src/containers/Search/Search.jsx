import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { useImmer } from 'use-immer';

import { COLORS, BREAK_POINTS } from '../../config/style'
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

const SearchContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const SubSearchContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 10vh 0;
	width: 100%;
	height: auto;
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		& > * {
			width: 80%;
		}
	}
	@media only screen and (min-width: ${BREAK_POINTS.SCREEN_SM}) {
		& > * {
			width: 50%;
		}
	}
`

const StyleButton = styled.button`
	color: ${COLORS.WHITE};
	background-color: ${COLORS.PINK_FLASHY};
	padding: 14px 20px;
	margin: 8px 0;
	margin-top: 2vh;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	:hover {
		transform: scale(1.05);
	}
`

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
	const [sort, setSort] = useState("age");
	const [ascending, setAscending] = useState(true);
	const [descending, setDescending] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [result, setResult] = useImmer([]);
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
	}, [setUserHobbies]);

	useEffect(() => {
		setResult(() => sortUsers(result, userPosition, userHobbies, sort, ascending, descending));
	}, [result, userHobbies, userPosition, sort, ascending, descending])

	const handleSubmit = () => {
		setIsLoading(true);
		api.get('/user/search', request)
		.then((res) => {
			setResult(() => sortUsers(res.data, userPosition, userHobbies, sort, ascending, descending))
			setIsLoading(false);
		})
		.catch((err) => {
			console.error(err);
			setIsLoading(false);
		})
	}

		return (
			!isLoading ? 
			<SearchContainer>
				<SubSearchContainer>
					<SearchRequestContext.Provider value={[request, setRequest]}>
						<Distance/>
						<Age/>
						<Popularity/>
						<OrderCheckbox descending={descending} ascending={ascending} setDescending={setDescending} setAscending={setAscending}/>
						<SortBy sort={sort} setSort={setSort}/>
						<Hobby/>
						<StyleButton onClick={handleSubmit}>Search</StyleButton>
					</SearchRequestContext.Provider>
					<Result result={result} sort={sort} descending={descending} ascending={ascending}/>
				</SubSearchContainer>
			</SearchContainer>
			: <Loader/>
		);
}

export default Search;