/* eslint-disable comma-dangle */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const { expect } = require('chai');

describe('Nftool', function () {
  let alice, bob, NFT, nftool;

  beforeEach(async function () {
    [deployer, alice, bob] = await ethers.getSigners();
    NFT = await ethers.getContractFactory('Nftool');
    nftool = await NFT.connect(deployer).deploy();
    await nftool.deployed();
  });

  describe('contructor', async () => {
    it("Should have created a NFT contract of name 'Nftool', and Symbol 'TOL", async function () {
      expect(await nftool.name()).to.equal('Nftool');
      expect(await nftool.symbol()).to.equal('TOL');
    });
  });

  describe('createNftool', async () => {
    let NFT;
    beforeEach(async function () {
      NFT = {
        contentHash: '0x9c4138cd0a1311e4748f70d0fe3dc55f0f5f75e0f20db731225cbc3b8914016a',
        content: 'NFT',
        title: 'NFT',
        author: 'NFT Master',
        url: 'https://NFT',
        timeStamp: new Date().toDateString(),
      };
    });

    it('Should increment the state variable _tokenIds', async function () {
      await nftool.connect(alice).createNftool(NFT, alice.address);
      expect(await nftool.connect(bob).totalSupply()).to.equal(1);
      NFT.contentHash = '0x9c4138cd0a1311e4748f70d0fe3dc55f0f5f75e0f20db731225cbc3b8914016a';
      await nftool.connect(alice).createCopyRight(NFT, alice.address);
      expect(await nftool.connect(bob).totalSupply()).to.equal(2);
    });

    it('Should find the right NFT with his ID', async function () {
      await nftool.connect(alice).createNftool(NFT, alice.address);
      const nft = await nftool.connect(alice).getTOOLById(1);
      expect(nft.content).to.equal('NFT');
    });
  });
});
