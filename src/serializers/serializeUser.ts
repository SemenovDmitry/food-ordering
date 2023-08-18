import { IUser } from 'types/models'

const serializeUser = ({ password, ...rest }: IUser) => rest 

export default serializeUser
