exports.userResponse = (users) => {

    userResult = [];
    users.forEach(user => {
        userResult.push({
            name: user.name,
            email: user.email,
            username: user.username,
            salary: user.salary,
            role:user.role,
            id:user._id
        });
    });
    return userResult;

}
