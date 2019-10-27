# Contract Hosts

ContractHost provides a way to install and run verifiable contracts.

Install(source) creates Installations. Installations represent particular
contract forms, which can be spawn()'d to create Contract instances
initialized with specific terms. These Contracts manage invitations for
multiple seats, each of which repesents a "role" in an interaction.

Some seats provide the methods `getWinnings()` and `getRefunds()`, which return
promises for payments for the outputs of the interaction. We provide the
`collect()` method (described later) to simplify collection of winnings and
refunds into appropriate purses.
