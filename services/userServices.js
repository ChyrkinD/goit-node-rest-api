export const changeSubscription = async (user, subscription) => {
    if (user.subscription !== subscription) {
        await user.update({ subscription });
    }
    return user;
};
