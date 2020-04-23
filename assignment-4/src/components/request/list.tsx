import React, { useState, useEffect, useReducer } from 'react';
import {Table} from 'antd';

interface Request {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface RequestListState {
  error: Error | null;
  requests: Request[];
}

const initialState: RequestListState = {
  error: null,
  requests: [],
};

function reducer(state: RequestListState, action: any) {
  switch (action.type) {
    case 'GET_REQUEST_SUCCESS':
      return {
        ...state,
        requests: action.payload as Request[],
        error: null,
      };
    case 'GET_REQUEST_FAIL':
      return {
        ...state,
        requests: [],
        error: action.payload as Error,
      };
    default:
      return state;
  }
}

export function RequestListReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [resubmit, setResubmit] = useState<number | string>(Date.now);
  const { error, requests } = state;
  
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: 'request date',
      dataIndex: 'request_date',
      key: 'request_date',
    },
    {
      title: 'latest update',
      dataIndex: 'latest_update',
      key: 'latest_update'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status'
    }
  ] as any;
  function onResubmit() {
    setResubmit(Date.now);
  }

  useEffect(() => {
    async function getRequests() {
      try {
        const response = await fetch(
          'http://localhost:3000/requests'
        );
        if (response.status > 299 || response.status < 200) {
          throw response;
        }
        const jsondata = await response.json();
        dispatch({
          type: 'GET_REQUEST_SUCCESS',
          payload: jsondata,
        });
      } catch (err) {
        dispatch({
          type: 'GET_REQUEST_SUCCESS',
          payload: new Error(err.status),
        });
      }
    }

    getRequests();
  }, [resubmit]);

  return (
    <div>
      <h3>List Request:</h3>
      <button onClick={onResubmit}>Resubmit</button>

      {error && <p>{error.message}</p>}
      <Table dataSource={requests} columns={columns} />;
    </div>
  );
}