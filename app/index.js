const {
  askConfigurationDetail,
  askDependencies,
  askToSelectOneDependencies,
  askWhatTypeOfVersionWant
} = require('./Question');
const { initialMenu, manageMenu } = require(`./menu`);
const Lodash = require('lodash');
const read = require('read-data');
const fs = require('fs');

const getUpdatedData = () => {
  return read.sync(__dirname + '/Database/data.json');
}

const getLastKeyCreated = () => {
  const data = getUpdatedData()
  return Lodash.findLastKey(data)
}

const createInDatabase = (objValues) => {
  const { name,
    description,
    version,
    dependenciesSelected,
    dependenciesName
  } = objValues;
  const lastCreated = getLastKeyCreated();
  const newKeyCreated = parseInt(lastCreated) + 1;
  const lastDataCreated = getUpdatedData();
  const objCreated = {
    name,
    description,
    version,
    dependencies: dependenciesSelected,
    dependenciesName
  };
  const objItems = {
    ...lastDataCreated,
    [`${newKeyCreated}`]: objCreated,
  };
  const objToJson = JSON.stringify(objItems);
  fs.writeFile(__dirname + '/Database/data.json', objToJson)
  console.log(`
      CI created:
      |
      |
      |_name: ${name}
      |
      |__description: ${description}
      |
      |___version: ${version}
      |__dependencies: ${dependenciesName ? dependenciesName : 'N/A'}
    `);
};

const getDependenciesName = (objItem) => {
  const { dependencies } = objItem;
  const data = getUpdatedData();
  const dependenciesName = dependencies.map(v => data[v.toString()].name)
  return dependenciesName
};

const handleTypeVersionUpdate = (objValues) => {
  const { typeVersion, objItem, newVersion } = objValues;
  const currVersion = objItem.version;
  const majorVersion = currVersion.substring(0, 1);
  const minorVersion = currVersion.substring(2, 3);
  switch (typeVersion) {
    case 'Major':
      const dependenciesAffected = getDependenciesName(objItem);
      if (dependenciesAffected) {
        console.log(`
          CAN HAVE CONFLICTS WITH OTHERS DEPENDENCIES 
          |
          |
          |___DEPENDENCIES AFFECTED: ${dependenciesAffected}
          `)
      }
      return `${newVersion}.0.0`
    case 'Minor':
      return `${majorVersion}.${newVersion}.0`
    default:
      return `${majorVersion}.${minorVersion}.${newVersion}`
  }
}
const upgradeVersion = (objValues) => {
  const {
    idConfItem,
    newVersion,
    typeVersion
  } = objValues;
  const lastDataCreated = getUpdatedData();
  const objItem = lastDataCreated[idConfItem[0].toString()]
  const newVersionNumber = handleTypeVersionUpdate({ objItem, typeVersion, newVersion });
  if (newVersionNumber) {
    const objUpdated = {
      ...objItem,
      version: newVersionNumber
    };
    const objItems = {
      ...lastDataCreated,
      [`${idConfItem}`]: objUpdated,
    };
    const objToJson = JSON.stringify(objItems);
    fs.writeFile(__dirname + '/Database/data.json', objToJson)
    console.log(`
      Version of ${objUpdated.name}:
      |
      |__UPDATED VERSION ${objItem.version} TO ${newVersionNumber}
    `);
  }
}
const getCIWithDependencies = idConfItem => {
  const data = getUpdatedData();
  const confItems = Object.values(data)
  const CIdependencies = confItems.filter(items => {
    const dependenciesInCI = items.dependencies;
    const isDependencies =  dependenciesInCI.filter(i => i === idConfItem[0])

    return isDependencies.length > 0
  })
  return CIdependencies 
}

const deprecateCI = (idConfItem) => {
  const dependenciesWithConflictIfIsDeprecated = getCIWithDependencies(idConfItem)
  dependenciesWithConflictIfIsDeprecated.forEach(item => {
    console.log(`
     This CI will be affected of ${item.name}:
      |
      |__With the  version ${item.version}
    `)
  })
  
}


// TODO: List all dependencies, manage menu
const handleCreateCI = () => {
  askConfigurationDetail().then(values => {
    const { dependencies } = values;
    if (dependencies) {
      const data = getUpdatedData()
      askDependencies(data).then(v => {
        const { dependenciesSelected } = v;
        const dependenciesForConfigurationItem = dependenciesSelected.map(dependencies => {
          const dp = dependencies.match(/\d+/g)
          return dp[0]
        })
        const dependenciesName = dependenciesForConfigurationItem.map(v => data[v.toString()].name)
        const dependenciesParsed = dependenciesForConfigurationItem.map(v => parseInt(v))
        createInDatabase({ ...values, dependenciesSelected: dependenciesParsed, dependenciesName })
        setTimeout(() => {
          initialMenu(handleCreateCI, handleUpgradeCI, handleDeprecateCI, handleListAll);
        }, 3000);
      })
    } else {
      createInDatabase({ ...values })
      setTimeout(() => {
        initialMenu(handleCreateCI, handleUpgradeCI, handleDeprecateCI, handleListAll);
      }, 3000);
    }

  })
};
const handleListAll = () => {
  const data = getUpdatedData();
  const arrData = Object.values(data).map(dt => {
    console.log(`
      CI ${dt.name}:
      |
      |
      |__description: ${dt.description}
      |
      |___version: ${dt.version}
      |
      |
      |__dependencies: ${dt.dependenciesName.length >= 0 ? dt.dependenciesName : 'N/A'}
    `);
    return dt
  })
  initialMenu(handleCreateCI, handleUpgradeCI, handleDeprecateCI, handleListAll);
};

const handleUpgradeCI = () => {
  const data = getUpdatedData()
  askToSelectOneDependencies(data).then(valuesDependenciesSelected => {
    const { dependenciesSelected } = valuesDependenciesSelected;
    const dependenciesSelectedToModify = dependenciesSelected.match(/\d+/g)
    const dependenciesSelectedParsed = dependenciesSelectedToModify.map(v => parseInt(v))
    console.log(dependenciesSelectedParsed)
    askWhatTypeOfVersionWant().then(valuesInfoNewVersion => {
      const { typeVersion, numberVersion } = valuesInfoNewVersion;
      upgradeVersion({
        idConfItem: dependenciesSelectedParsed,
        newVersion: numberVersion,
        typeVersion: typeVersion
      })
      setTimeout(() => {
        initialMenu(handleCreateCI, handleUpgradeCI, handleDeprecateCI, handleListAll);
      }, 3000);
    })

  })
};

const handleDeprecateCI = () => {
  const data = getUpdatedData()
  askToSelectOneDependencies(data).then(valuesDependenciesSelected => {
    const { dependenciesSelected } = valuesDependenciesSelected;
    const dependenciesSelectedToModify = dependenciesSelected.match(/\d+/g)
    const dependenciesSelectedParsed = dependenciesSelectedToModify.map(v => parseInt(v))
    console.log(dependenciesSelectedParsed)
    deprecateCI(dependenciesSelectedParsed)
    setTimeout(() => {
      initialMenu(handleCreateCI, handleUpgradeCI, handleDeprecateCI, handleListAll);
    }, 3500);
  })
}

// TODO: Simulate deprecate
initialMenu(handleCreateCI, handleUpgradeCI, handleDeprecateCI, handleListAll);

