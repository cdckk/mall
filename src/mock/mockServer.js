import Mock from 'mockjs'
import data from './data.json'

Mock.mock('/userInfo', {code: 0, data: data.userInfo})