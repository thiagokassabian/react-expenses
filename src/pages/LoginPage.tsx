import { Alert, Box, Button, Card, CardActions, CardContent, TextField, Typography } from "@mui/material"
import { FormEvent, useState } from "react"
import { IUser } from "../@types/expenses"
import { signIn } from "../contexts/UserAuthContext/actions"

interface ILoginPageProps {
	onSignIn: (user: IUser) => void
}

const LoginPage = (props: ILoginPageProps) => {
	const { onSignIn } = props
	const [email, setEmail] = useState<string>("usuario@email.com")
	const [password, setPassword] = useState<string>("1234")
	const [error, setError] = useState<string>("")

	const login = (e: FormEvent) => {
		e.preventDefault()
		signIn(email, password).then(onSignIn, e => setError("E-mail ou senha incorretos"))
	}

	return (
		<Card sx={{ maxWidth: 500, marginX: "auto", marginTop: 4 }} component="div">
			<form onSubmit={login}>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						Login
					</Typography>
					<Box>
						<TextField
							type="email"
							required
							id="email"
							label="E-mail"
							fullWidth
							margin="normal"
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>
						<TextField
							type="password"
							required
							id="password"
							label="Senha"
							fullWidth
							margin="normal"
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
					</Box>
					{error && <Alert severity="error">{error}</Alert>}
				</CardContent>
				<CardActions sx={{ display: "flex", justifyContent: "end" }}>
					<Button type="submit" variant="contained">
						Entrar
					</Button>
				</CardActions>
			</form>
		</Card>
	)
}

export default LoginPage
