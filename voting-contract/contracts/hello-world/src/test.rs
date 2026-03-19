use soroban_sdk::{Env, Symbol};
use hello_world::{VotingContract, VotingContractClient};

#[test]
fn test_vote() {

    let env = Env::default();

    let contract_id = env.register_contract(None, VotingContract);

    let client = VotingContractClient::new(&env, &contract_id);

    let proposal = Symbol::short("prop1");

    client.vote(&proposal);

    let votes = client.get_votes(&proposal);

    assert_eq!(votes, 1);
}

#[test]
fn test_multiple_votes() {

    let env = Env::default();

    let contract_id = env.register_contract(None, VotingContract);

    let client = VotingContractClient::new(&env, &contract_id);

    let proposal = Symbol::short("prop1");

    client.vote(&proposal);
    client.vote(&proposal);

    let votes = client.get_votes(&proposal);

    assert_eq!(votes, 2);
}