#![no_std]

use soroban_sdk::{contract, contractimpl, Env, Symbol, symbol_short, Map};

#[contract]
pub struct VotingContract;

#[contractimpl]
impl VotingContract {

    pub fn vote(env: Env, proposal: Symbol) {

        let mut votes: Map<Symbol, u32> =
            env.storage().instance().get(&symbol_short!("votes"))
            .unwrap_or(Map::new(&env));

        let count = votes.get(proposal.clone()).unwrap_or(0);

        votes.set(proposal, count + 1);

        env.storage().instance().set(&symbol_short!("votes"), &votes);
    }

    pub fn get_votes(env: Env, proposal: Symbol) -> u32 {

        let votes: Map<Symbol, u32> =
            env.storage().instance()
            .get(&symbol_short!("votes"))
            .unwrap_or(Map::new(&env));

        votes.get(proposal).unwrap_or(0)
    }

}