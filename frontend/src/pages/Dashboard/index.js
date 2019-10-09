import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import {
  Container,
  Today,
  Content,
  Profile,
  ContentChart,
  ContentCard,
} from './styles';

import api from '../../services/api';

export default function Dashboard() {
  const [totalInstallation, setTotalInstallation] = useState(0);
  const [maxCost, setMaxCost] = useState(0);
  const [months, setMonths] = useState([]);
  const [zipCode, setZipCode] = useState(0);
  const [data, setData] = useState([]);

  const profile = useSelector(state => state.user.profile);
  const { state } = profile;

  useEffect(() => {
    async function loadTotalInstallation() {
      const response = await api.get(`panels/totalInstallation/${profile.id}`);

      setTotalInstallation(response.data);
    }

    async function loadMaxCost() {
      const response = await api.get(`panels/maxCost/${profile.id}`);

      setMaxCost(response.data.maxCost);
      setZipCode(response.data.zip_code);
    }

    async function loadLargerMonths() {
      const response = await api.get(`panels/largerMonths/${profile.id}`);

      setMonths(response.data);
    }

    async function getDataGraphic() {
      const response = await api.get(`panels/graphic/${profile.id}`);

      setData(response.data);
    }

    getDataGraphic();
    loadLargerMonths();
    loadMaxCost();
    loadTotalInstallation();
  }, []);

  return (
    <>
      <Container>
      </Container>
    </>
  );
}
