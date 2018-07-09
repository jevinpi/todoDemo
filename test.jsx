const user = {
	"firstName": "Kobe",
	"lastName": "Bryant"
}
function formatName(user) {
	return user.firstName + ' ' + user.lastName;
}
class DemoName extends Component{
	render() {
		return (
			<div>
				<p>Hello, { formatName(user) }</p>
			</div>
		)
	}
}