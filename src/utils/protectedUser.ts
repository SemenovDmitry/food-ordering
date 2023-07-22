import { IUser } from 'types/models'

const protectedUser = ({ password, ...rest }: IUser) => rest 

export default protectedUser
