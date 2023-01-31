import axios from 'axios';
import React, { Fragment } from 'react';

export const getImages = async (searchTerm='random', orientation='landscape', color='black') => 
await axios.get(`https://api.unsplash.com/search/photos?query=${searchTerm}&orientation=${orientation}&color=${color}&client_id=RYJgaPJdbVb-PnfRsN8HXD7bsGPyjWL_NV34OmTEIB8`);


