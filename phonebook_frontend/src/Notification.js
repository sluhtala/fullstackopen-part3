const Notification = ({ notification, error }) => {
	if (!notification) return null;
	return (
		<div className={error ? "error notification" : "notification"}>
			{notification}
		</div>
	);
};

export default Notification;
